import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    _id: Number,
    bookingId: {
      type: String,
      unique: true,
    },

    customerId: {
      type: Number,
      ref: "user_collection",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    dropAddress: {
      type: String,
      required: true,
    },

    pickupCoordinates: {
      lat: Number,
      lng: Number,
    },

    dropCoordinates: {
      lat: Number,
      lng: Number,
    },

    distance: Number,

    duration: Number,

    estimatedFare: Number,

    customerOffer: Number,

    images: [String],

    status: {
      type: String,

      enum: [
        "Pending",

        "Accepted",
        
        "Rejected",
        
        "Confirmed",
        
        "Assigned",

        "Reached Pickup",

        "Pickup Completed",

        "In Progress",

        "Reached Destination",

        "Completed",

        "Cancelled",
      ],

      default: "Pending",
    },
    quoteStatus: {
      type: "String",
      enum: ["Open", "Closed"],
      default: "Open",
    },

    partnerId: {
      type: Number,

      default: null,
    },

    quoteId: {
      type: Number,

      default: null,
    },

    driverId: {
      type: Number,

      default: null,
    },

    vehicleId: {
      type: Number,

      default: null,
    },

    paymentStatus: {
      type: String,

      default: "Pending",
    },

    paymentMethod: {
      type: String,

      default: "",
    },

    transactionId: {
      type: String,

      default: "",
    },

    paymentDate: {
      type: Date,

      default: null,
    },

    finalAmount: {
      type: Number,

      default: 0,
    },
    assignedAt:{

    type:Date,

    default:null

},

completedAt:{

    type:Date,

    default:null

},
customerOffer:{
  type:Number,
  required:true,
  default:0,
}
  },
  {
    timestamps: true,
  },
);
const BookingSchemaModel = mongoose.model("booking_collection", bookingSchema);

export default BookingSchemaModel;
