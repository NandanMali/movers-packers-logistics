import mongoose from "mongoose";
import BookingQuoteSchemaModel from "../models/BookingQuoteModel.js";
import BookingSchemaModel from "../models/bookingModel.js";
import PartnerProfileSchemaModel from "../models/partnerProfileModel.js";

export const sendQuote = async (req, res) => {
  try {
    const {
      bookingId,

      partnerId,

      estimatedPrice,

      estimatedDays,

      vehicleType,

      message,
    } = req.body;

    //---------------------------------------------

    const booking = await BookingSchemaModel.findOne({
      _id: bookingId,
    });
    if (!booking) {
      return res.status(404).json({
        success: false,

        message: "Booking not found",
      });
    }
    //------------------------------------

    if (booking.quoteStatus !== "Open" || booking.status !== "Pending") {
      return res.status(400).json({
        success: false,

        message: "This booking is not accepting quotes.",
      });
    }


    //------------------------------------

    const partner = await PartnerProfileSchemaModel.findOne({
      userId: partnerId,
    });

    if (!partner) {
      return res.status(404).json({
        success: false,

        message: "Partner not found",
      });
    }
    //------------------------------------

    const alreadySent = await BookingQuoteSchemaModel.findOne({
      bookingId,

      partnerId,
    });

    if (alreadySent) {
      return res.status(400).json({
        success: false,

        message: "Quote already sent",
      });
    }
    //------------------------------------

    const lastQuote = await BookingQuoteSchemaModel.findOne()

      .sort({ _id: -1 });

    const nextId = lastQuote ? lastQuote._id + 1 : 1;

    //------------------------------------

    const quote = await BookingQuoteSchemaModel.create({
      _id: nextId,

      bookingId,

      partnerId,

      estimatedPrice,

      estimatedDays,

      vehicleType,

      message,
    });
    //------------------------------------

    return res.status(201).json({
      success: true,

      message: "Quote sent successfully",

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

export const getQuoteRequests = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;

    //---------------------------------------

    const bookings = await BookingSchemaModel.find({
      quoteStatus: "Open",
    });

    //---------------------------------------

    const partnerQuotes = await BookingQuoteSchemaModel.find({
      partnerId,
    });

    //---------------------------------------

    const quotedBookingIds = new Set(
      partnerQuotes.map((quote) => quote.bookingId),
    );

    //---------------------------------------

    const requests = bookings.filter(
      (booking) => !quotedBookingIds.has(booking._id),
    );

    //---------------------------------------

    return res.status(200).json({
      success: true,

      total: requests.length,

      requests,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const fetch= async (req,res)=>{
  try {
    const partnerId = req.params.partnerId;
    const quote = await BookingQuoteSchemaModel.find({partnerId:partnerId});
    return res.status(200).json({
      success: true,
      quote,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }

}

export const acceptQuote = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      bookingId,

      quoteId,

      partnerId,

    } = req.body;
    //------------------------------------

    const booking = await BookingSchemaModel.findOne({
      _id: bookingId,
    }).session(session);

    if (!booking) {
      await session.abortTransaction();

      session.endSession();

      return res.status(404).json({
        success: false,

        message: "Booking not found.",
      });
    }

    //------------------------------------

    if (booking.status !== "Pending") {
      await session.abortTransaction();

      session.endSession();

      return res.status(400).json({
        success: false,

        message: "Quote already accepted.",
      });
    }

    //------------------------------------

    const selectedQuote = await BookingQuoteSchemaModel.findOne({
      _id: quoteId,

      bookingId,

      status: "Pending",
    }).session(session);

    if (!selectedQuote) {
      await session.abortTransaction();

      session.endSession();

      return res.status(404).json({
        success: false,

        message: "Quote not found.",
      });
    }

    //------------------------------------
    // Accept Selected Quote

    selectedQuote.status = "Accepted";

    await selectedQuote.save({ session });

    //------------------------------------
    // Reject Remaining Quotes
    await BookingQuoteSchemaModel.updateMany(
      {
        bookingId,

        _id: { $ne: quoteId },
      },

      {
        $set: {
          status: "Rejected",
        },
      },

      {
        session,
      },
    );

    //------------------------------------
    // Update Booking

    booking.partnerId = selectedQuote.partnerId;

    booking.quoteId = selectedQuote._id;

    booking.status = "Accepted";

    booking.quoteStatus = "Closed";

    await booking.save({ session });

    //------------------------------------

    await session.commitTransaction();

    session.endSession();

    //------------------------------------

    return res.status(200).json({
      success: true,

      message: "Quote accepted successfully.",
    });
  } catch (error) {
    console.log(error);

    await session.abortTransaction();

    session.endSession();

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getById= async (req,res)=>{
  try{
    console.log(req.query);
    const quote=await BookingQuoteSchemaModel.find(req.query);
     if (!quote) {
      return res.status(404).json({
        success: false,

        message: "No Quote received.",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Quote Found",
      quote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: "Server Error.",
    });
  }

}

export const showQuote = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const quotes = await BookingQuoteSchemaModel.find({ bookingId });
    if (!quotes) {
      return res.status(404).json({
        success: false,

        message: "No Quote received.",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Quote Found",
      quotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: "Server Error.",
    });
  }
};
