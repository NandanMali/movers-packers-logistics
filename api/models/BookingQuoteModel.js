import mongoose from "mongoose";

const bookingQuoteSchema = mongoose.Schema({
  _id: Number,

  bookingId: {
    type: Number,
    required: true,
  },

  partnerId: {
    type: Number,
    required: true,
  },

  estimatedPrice: {
    type: Number,
    required: true,
  },

  estimatedDays: {
    type: String,
    required: true,
  },

  vehicleType: {
    type: String,
    required: true,
    trim: true,
  },

  message: {
    type: String,
    trim: true,
    default: "",
  },

  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Cancelled", "Expired"],
    default: "Pending",
  },

 

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookingQuoteSchemaModel =  mongoose.model("booking_quotes", bookingQuoteSchema);
export default BookingQuoteSchemaModel;
