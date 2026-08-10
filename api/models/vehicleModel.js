import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
  {
    _id: Number,

    partnerId: {
      type: Number,

      ref: "user_collection",

      required: true,
    },
    currentBookingId: {

    type: Number,

    default: null

},

    vehicleNumber: {
      type: String,

      unique: true,

      required: true,

      trim: true,

      uppercase: true,
    },

    vehicleName: {
      type: String,

      required: true,

      trim: true,
    },

    vehicleType: {
      type: String,

      required: true,

      lowercase:true,
    },

    brand: {
      type: String,

      default: "",
    },

    model: {
      type: String,

      default: "",
    },

    capacity: {
      type: String,

      default: "",
    },

    fuelType: {
      type: String,

      default: "",
    },

    status: {
      type: String,

      enum: ["Available", "Assigned", "On Trip", "Maintenance", "Inactive"],

      default: "Available",
    },

    images: 
      {
        type: String,
      },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("vehicle_collection", vehicleSchema);
