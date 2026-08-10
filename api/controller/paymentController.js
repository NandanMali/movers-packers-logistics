import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

import BookingSchemaModel from "../models/bookingModel.js";

import BookingQuoteSchemaModel from "../models/BookingQuoteModel.js";

import PaymentSchemaModel from "../models/paymentModel.js";
import PartnerProfileSchemaModel from "../models/partnerProfileModel.js";
import UserSchemaModel from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//================================================
// CREATE STRIPE CHECKOUT SESSION
//================================================

export const createPaymentSession = async (req, res) => {
  try {
    const {
      bookingId,

      customerId,

      quoteId,
    } = req.body;

    //-----------------------------------------
    // Find booking
    //-----------------------------------------

    const booking = await BookingSchemaModel.findOne({
      _id: bookingId,

      customerId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,

        message: "Booking not found",
      });
    }

    //-----------------------------------------
    // Booking must be Quote Accepted
    //-----------------------------------------

    if (booking.status !== "Accepted") {
      return res.status(400).json({
        success: false,

        message: "Payment is not available for this booking",
      });
    }

    //-----------------------------------------
    // Find accepted quote
    //-----------------------------------------

    const quote = await BookingQuoteSchemaModel.findOne({
      _id: quoteId,

      bookingId,

      status: "Accepted",
    });

    if (!quote) {
      return res.status(404).json({
        success: false,

        message: "Accepted quote not found",
      });
    }

    //-----------------------------------------
    // Check existing payment
    //-----------------------------------------

    const existingPayment = await PaymentSchemaModel.findOne({
      bookingId,
    });

    if (existingPayment && existingPayment.paymentStatus === "Success") {
      return res.status(400).json({
        success: false,

        message: "Payment already completed",
      });
    }

    //-----------------------------------------
    // Stripe Checkout
    //-----------------------------------------

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: ` Booking #${bookingId}`,

              description: "Movers & Packers Booking",
            },

            unit_amount: Math.round(
              Number(quote.estimatedPrice + quote.estimatedPrice / 100) * 100,
            ),
          },

          quantity: 1,
        },
      ],

      customer_email: req.body.email || undefined,

      //--------------------------------
      // Very important
      //--------------------------------

      metadata: {
        bookingId: String(bookingId),

        customerId: String(customerId),

        quoteId: String(quoteId),

        partnerId: String(quote.partnerId),
      },
      success_url: `${process.env.CLIENT_URL}/user/payment-success?bookingId=${bookingId}&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/user/payment-cancel`,
    });

    //-----------------------------------------

    return res.status(200).json({
      success: true,

      url: session.url,

      sessionId: session.id,
    });
  } catch (error) {
    console.log("Stripe Session Error:", error);

    return res.status(500).json({
      success: false,

      message: "Unable to create payment session",
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;
  console.log(req.body,"req")

  try {
    event = stripe.webhooks.constructEvent(
      req.body,

      signature,

      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log(error.message);

    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  //--------------------------------------------------

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    //-----------------------------------

    const bookingId = Number(session.metadata.bookingId);

    const customerId = Number(session.metadata.customerId);

    const partnerId = Number(session.metadata.partnerId);

    const quoteId = Number(session.metadata.quoteId);

    //-----------------------------------

    const amount = session.amount_total / 100;

    //-----------------------------------

    const transactionId = session.payment_intent;

    //-----------------------------------

    //-----------------------------------
    // Check Duplicate Payment
    //-----------------------------------

    const existingPayment = await PaymentSchemaModel.findOne({
      transactionId,
    });

    if (existingPayment) {
      console.log("Payment already exists.");

      return res.json({
        received: true,
      });
    }
console.log("pay s")
    //-----------------------------------
    // Generate Payment ID
    //-----------------------------------

    const lastPayment = await PaymentSchemaModel.findOne()

      .sort({ _id: -1 });

    const nextPaymentId = lastPayment ? lastPayment._id + 1 : 1;

    //-----------------------------------
    // Save Payment
    //-----------------------------------

    await PaymentSchemaModel.create({
      _id: nextPaymentId,

      bookingId,

      quoteId,

      customerId,

      partnerId,

      amount,

      paymentMethod: "Card",

      transactionId,

      paymentStatus: "Paid",

      paidAt: new Date(),
    });
    console.log("pay e")

    //-----------------------------------
    // Update Booking
    //-----------------------------------

    await BookingSchemaModel.updateOne(
      {
        _id: bookingId,
      },

      {
        $set: {
          status: "Confirmed",

          paymentStatus: "Paid",

          quoteStatus: "Closed",

          partnerId,

          quoteId,

          transactionId,

          paymentMethod: "Card",

          finalAmount: amount,
        },
      },
    );

    await BookingQuoteSchemaModel.updateOne(
      {
        _id: quoteId,
      },

      {
        $set: {
          status: "Accepted",
        },
      },
    );

    await BookingQuoteSchemaModel.updateMany(
      {
        bookingId,

        _id: {
          $ne: quoteId,
        },
      },

      {
        $set: {
          status: "Rejected",
        },
      },
    );
  }

  return res.json({
    received: true,
  });
};

export const getPaymentReceipt = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    //---------------------------------------

    const booking = await BookingSchemaModel.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,

        message: "Booking not found",
      });
    }

    //---------------------------------------

    const payment = await PaymentSchemaModel.findOne({
      bookingId,
    });

    //---------------------------------------

    const quote = await BookingQuoteSchemaModel.findOne({
      bookingId,

      status: "Accepted",
    });

    //---------------------------------------

    return res.status(200).json({
      success: true,

      booking,

      payment,

      quote,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getCustomerPayments = async (req, res) => {
  try {
    const customerId = Number(req.params.customerId);

    //----------------------------------------

    const payments = await PaymentSchemaModel.find({ customerId }).sort({
      paidAt: -1,
    });
//----------------------------------------

    const paymentList = [];

    for (const payment of payments) {
      const booking = await BookingSchemaModel.findById(payment.bookingId);

      const quote = await BookingQuoteSchemaModel.findById(payment.quoteId);

      const partner = await PartnerProfileSchemaModel.findOne({
        userId: payment.partnerId,
      });

      paymentList.push({
        payment,

        booking,

        quote,

        partner,
      });
    }
    //----------------------------------------

    return res.status(200).json({
      success: true,

      total: paymentList.length,

      payments: paymentList,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getPartnerPayments = async (req, res) => {
  try {
    const partnerId = Number(req.params.partnerId);

    //-------------------------------------

    const payments = await PaymentSchemaModel.find({ partnerId }).sort({
      paidAt: -1,
    });

    //-------------------------------------

    const paymentList = [];

    for (const payment of payments) {
      const booking = await BookingSchemaModel.findById(payment.bookingId);

      const quote = await BookingQuoteSchemaModel.findById(payment.quoteId);

      const customer = await UserSchemaModel.findById(payment.customerId);

      const partner = await PartnerProfileSchemaModel.findOne({
        userId: partnerId,
      });

      paymentList.push({
        payment,

        booking,

        quote,

        customer,

        partner,
      });
    }

    //-------------------------------------

    return res.status(200).json({
      success: true,

      payments: paymentList,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentSchemaModel.find().sort({ paidAt: -1 });

    const paymentList = [];

    for (const payment of payments) {
      const booking = await BookingSchemaModel.findById(payment.bookingId);

      const quote = await BookingQuoteSchemaModel.findById(payment.quoteId);

      const customer = await UserSchemaModel.findById(payment.customerId);

      const partner = await PartnerProfileSchemaModel.findOne({
        userId: payment.partnerId,
      });

      paymentList.push({
        payment,

        booking,

        quote,

        customer,

        partner,
      });
    }

    return res.status(200).json({
      success: true,

      totalPayments: paymentList.length,

      payments: paymentList,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getCompletePaymentReceipt = async (req, res) => {
  try {
    const bookingId = Number(req.params.bookingId);

    //----------------------------------------

    const payment = await PaymentSchemaModel.findOne({
      bookingId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,

        message: "Payment not found",
      });
    }

    //----------------------------------------

    const booking = await BookingSchemaModel.findById(bookingId);

    //----------------------------------------

    const quote = await BookingQuoteSchemaModel.findById(payment.quoteId);

    //----------------------------------------

    const customer = await UserSchemaModel.findById(payment.customerId);

    //----------------------------------------

    const partnerProfile = await PartnerProfileSchemaModel.findOne({
      userId: payment.partnerId,
    });

    //----------------------------------------

    //----------------------------------------

    const partner = await UserSchemaModel.findOne({
      _id: payment.partnerId,
    });

    //----------------------------------------

    return res.status(200).json({
      success: true,

      receipt: {
        payment,

        booking,

        quote,

        customer,

        partnerProfile,

        partner,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};
