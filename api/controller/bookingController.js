import "../models/connection.js";
import fs from "fs";
import url from "url";
import path from "path";
import mongoose from "mongoose";

//to link user model on controller
import BookingSchemaModel from "../models/bookingModel.js";
import BookingQuoteSchemaModel from "../models/BookingQuoteModel.js";
import PartnerProfileSchemaModel from "../models/partnerProfileModel.js";
import UserSchemaModel from "../models/user.model.js";
import DriverSchemaModel from "../models/driverModel.js";
import VehicleSchemaModel from "../models/vehicleModel.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const saveBooking = async (req, res) => {
  try {
    const bookings = await BookingSchemaModel.find();
    const l = bookings.length;
    const _id = l == 0 ? 1 : bookings[l - 1]._id + 1;

    const bookingId = `BK${String(bookings.length + 1).padStart(6, "0")}`;

    let imageNames = [];

    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (const image of images) {
        const fileName = Date.now() + "_" + image.name;

        const uploadPath = path.join(
          __dirname,
          "../../ui/public/assets/uploads/booking",
          fileName,
        );

        await image.mv(uploadPath);

        imageNames.push(fileName);
      }
    }

    const bookingData = {
      ...req.body,

      _id,

      bookingId,

      images: imageNames,

      status: "Pending",
    };

    await BookingSchemaModel.create(bookingData);

    res.status(201).json({
      status: true,

      message: "Booking Created",

      booking: bookingData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,

      message: "Server Error",
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingSchemaModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await BookingSchemaModel.find(req.query);

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    res.status(200).json({
      status: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await BookingSchemaModel.findByIdAndUpdate(
      req.params.id,

      {
        status: req.body.status,
        partnerId: req.body.partnerId || null,
      },

      {
        new: true,
      },
    );

    res.status(200).json({
      status: true,

      booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,

      message: "Server Error",
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await BookingSchemaModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: true,

      message: "Booking Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: false,

      message: "Server Error",
    });
  }
};

export const getAvailableBookings = async (req, res) => {
  try {
    const bookings = await BookingSchemaModel.find({
      status: "Waiting For Quotes",
    });

    res.json({
      status: true,

      bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
    });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const bookingId = Number(req.params.bookingId);

    //-------------------------------------------------

    const booking = await BookingSchemaModel.findOne({
      _id: bookingId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,

        message: "Booking not found",
      });
    }

    //-------------------------------------------------

    // let customer = null;

    // let partner = null;

    // let quote = null;

    // let driver = null;

    // let vehicle = null;

    //-------------------------------------------------
    // Payment Completed

    if (booking.paymentStatus === "Paid") {
      //---------------------------------

      const customer = await UserSchemaModel.findOne({
        _id: booking.customerId,
      });

      const customerDetails = customer
        ? {
            id: customer._id,

            name: customer.name,

            phone: customer.phone,

            email: customer.email,

            profilePic: customer.profilepic,
          }
        : null;

      //---------------------------------

      const partnerProfile = await PartnerProfileSchemaModel.findOne({
        userId: booking.partnerId,
      });

      let partnerUser = null;

      if (partnerProfile) {
        partnerUser = await UserSchemaModel.findOne({
          _id: booking.partnerId,
        });
      }

      //-----------------------------------
      //Partner Details
      //-----------------------------------

      const partnerDetails =
        partnerProfile && partnerUser
          ? {
              id: partnerUser._id,

              companyName: partnerProfile.companyName,

              ownerName: partnerUser.name,

              phone: partnerUser.phone,

              email: partnerUser.email,

              profilePic: partnerUser.profilepic,

              companyLogo: partnerProfile.companyLogo,

              businessAddress: partnerProfile.businessAddress,

              gstNumber: partnerProfile.gstNumber,

              experience: partnerProfile.experience,

              description: partnerProfile.description,

              services: partnerProfile.services,

              serviceCities: partnerProfile.serviceCities,

              isVerified: partnerProfile.isVerified,
            }
          : null;

      //---------------------------------

      let quote = await BookingQuoteSchemaModel.findOne({
        _id: booking.quoteId,
      });

      const quoteDetails = quote
        ? {
            estimatedPrice: quote.estimatedPrice,

            estimatedDays: quote.estimatedDays,

            vehicleType: quote.vehicleType,

            message: quote.message,
          }
        : null;

      //-------------------------------------------------
      // Driver Assigned

      if (booking.driverId && booking.vehicleId) {
        //---------------------------------

        let driver = await DriverSchemaModel.findOne({
          _id: booking.driverId,
        });

        const driverDetails = driver
          ? {
              id: driver._id,

              name: driver.name,

              phone: driver.phone,

              photo: driver.photo,

              licenseNumber: driver.licenseNumber,

              currentLocation: driver.currentLocation,
            }
          : null;

        //---------------------------------

        vehicle = await VehicleSchemaModel.findOne({
          _id: booking.vehicleId,
        });

        const vehicleDetails = vehicle
          ? {
              id: vehicle._id,

              vehicleName: vehicle.vehicleName,

              vehicleNumber: vehicle.vehicleNumber,

              vehicleType: vehicle.vehicleType,

              capacity: vehicle.capacity,
            }
          : null;
      }

      //-------------------------------------------------

      return res.status(200).json({
        success: true,

        booking,

        customer: customerDetails,

        partner: partnerDetails,

        driver: driverDetails,

        vehicle: vehicleDetails,

        quote: quoteDetails,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getAssignedJobs = async (req, res) => {
  try {
    const partnerId = Number(req.params.partnerId)

    //------------------------------------------

    const bookings = await BookingSchemaModel.find({
      partnerId,

      paymentStatus: "Paid",

      status: "Confirmed",
    }).sort({
      paymentDate: -1,
    });

    //------------------------------------------

    return res.status(200).json({
      success: true,

      total: bookings.length,

      bookings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const assignDriverVehicle = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      bookingId,

      partnerId,

      driverId,

      vehicleId,
    } = req.body;

    //-----------------------------------------

    const booking = await BookingSchemaModel.findOne({
      _id: bookingId,

      partnerId,
    }).session(session);

    if (!booking) {
      await session.abortTransaction();

      session.endSession();

      return res.status(404).json({
        success: false,

        message: "Booking not found.",
      });
    }

    //-----------------------------------------

    if (booking.paymentStatus !== "Paid") {
      await session.abortTransaction();

      session.endSession();

      return res.status(400).json({
        success: false,

        message: "Payment is not completed.",
      });
    }
    //-----------------------------------------

    if (booking.driverId || booking.vehicleId) {
      await session.abortTransaction();

      session.endSession();

      return res.status(400).json({
        success: false,

        message: "Driver and Vehicle already assigned.",
      });
    }

    //-----------------------------------------

    const driver = await DriverSchemaModel.findOne({
      _id: driverId,

      partnerId,
    }).session(session);

    if (!driver) {
      await session.abortTransaction();

      session.endSession();

      return res.status(404).json({
        success: false,

        message: "Driver not found.",
      });
    }

    //-----------------------------------------

    const vehicle = await VehicleSchemaModel.findOne({
      _id: vehicleId,

      partnerId,
    }).session(session);

    if (!vehicle) {
      await session.abortTransaction();

      session.endSession();

      return res.status(404).json({
        success: false,

        message: "Vehicle not found.",
      });
    }

    //-----------------------------------------
    // Optional Busy Checks

    if (driver.status === "Assigned") {
      await session.abortTransaction();

      session.endSession();

      return res.status(400).json({
        success: false,

        message: "Driver is already assigned.",
      });
    }

    if (vehicle.status === "Assigned") {
      await session.abortTransaction();

      session.endSession();

      return res.status(400).json({
        success: false,

        message: "Vehicle is already assigned.",
      });
    }
    //-----------------------------------------

    booking.driverId = driverId;

    booking.vehicleId = vehicleId;

    booking.status = "Assigned";

    booking.assignedAt = new Date();

    await booking.save({ session });

    //-----------------------------------------


    driver.status = "Assigned";


    await driver.save({ session });

    //-----------------------------------------

    vehicle.status = "Assigned";

    await vehicle.save({ session });

    //-----------------------------------------

    await session.commitTransaction();

    session.endSession();

    return res.status(200).json({
      success: true,

      message: "Driver & Vehicle assigned successfully.",
    });
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const partnerId = Number(req.params.partnerId);

    //-----------------------------------

    const bookings = await BookingSchemaModel.find({
      partnerId,

    }).sort({
      assignedAt: -1,
    });

    //-----------------------------------

    return res.status(200).json({
      success: true,

      total: bookings.length,

      bookings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const updatePartnerBookingStatus = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      bookingId,

      status,
    } = req.body;

    //-------------------------------------

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

    //-------------------------------------

    booking.status = status;

    //-------------------------------------

    if (status === "Completed") {
      booking.completedAt = new Date();

      //---------------------------------

      await DriverSchemaModel.updateOne(
        {
          _id: booking.driverId,
        },

        {
          $set: {
            status: "Available",

            currentBookingId: null,
          },
        },
      ).session(session);

      //---------------------------------

      await VehicleSchemaModel.updateOne(
        {
          _id: booking.vehicleId,
        },

        {
          $set: {
            status: "Available",

            currentBookingId: null,
          },
        },
      ).session(session);
    }

    //-------------------------------------

    await booking.save({
      session,
    });

    //-------------------------------------

    await session.commitTransaction();

    session.endSession();

    //-------------------------------------

    return res.status(200).json({
      success: true,

      message: "Booking status updated successfully.",
    });
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};


export const getAllBookingsForAdmin = async (req, res) => {

    try {

        const bookings = await BookingSchemaModel
            .find({})
            .sort({ createdAt: -1 })
            .lean();

        const completeBookings = await Promise.all(

            bookings.map(async (booking) => {

                //--------------------------------
                // CUSTOMER
                //--------------------------------

                const customer = await UserSchemaModel.findOne({

                    _id: booking.customerId

                }).lean();


                //--------------------------------
                // Partner
                //--------------------------------

                const partner = await UserSchemaModel.findOne({

                    _id: booking.partnerId

                }).lean();



                //--------------------------------
                // ACCEPTED QUOTE
                //--------------------------------

                const acceptedQuote =
                    await BookingQuoteSchemaModel.findOne({

                        bookingId: booking._id,

                        status: "Accepted"

                    }).lean();


                //--------------------------------
                // Company
                //--------------------------------

                let company = null;

                if (acceptedQuote?.partnerId) {

                    company =
                        await PartnerProfileSchemaModel.findOne({

                            userId: acceptedQuote.partnerId

                        }).lean();

                }


                //--------------------------------
                // DRIVER
                //--------------------------------

                let driver = null;

                if (booking.driverId) {

                    driver =
                        await DriverSchemaModel.findOne({

                            _id: booking.driverId

                        }).lean();

                }


                //--------------------------------
                // VEHICLE
                //--------------------------------

                let vehicle = null;

                if (booking.vehicleId) {

                    vehicle =
                        await VehicleSchemaModel.findOne({

                            _id: booking.vehicleId

                        }).lean();

                }


                //--------------------------------
                // RETURN COMPLETE DATA
                //--------------------------------

                return {

                    ...booking,

                    customer: customer || null,

                    partner: partner || null,

                    company: company || null,

                    driver: driver || null,

                    vehicle: vehicle || null,

                    acceptedQuote: acceptedQuote || null

                };

            })

        );


        //--------------------------------

        return res.status(200).json({

            success: true,

            total: completeBookings.length,

            bookings: completeBookings

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};


export const cancelBooking = async (req, res) => {

    try {

        const {
            bookingId,
            customerId
        } = req.body;

        //------------------------------------

        const booking = await BookingSchemaModel.findOne({

            _id: bookingId,

            customerId: Number(customerId)

        });

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found"

            });

        }

        //------------------------------------
        // Only Pending booking can be cancelled
        //------------------------------------

        if (booking.status !== "Pending") {

            return res.status(400).json({

                success: false,

                message:
                    "This booking cannot be cancelled now."

            });

        }

        //------------------------------------

        booking.status = "Cancelled";

        booking.quoteStatus = "Closed";

        await booking.save();

        //------------------------------------

        return res.status(200).json({

            success: true,

            message: "Booking cancelled successfully"

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};