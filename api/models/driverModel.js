import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
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

  driverName: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
  },

  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },

  experience: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  status:{

    type:String,

    enum:["Available","Assigned"],

    default:"Available"

},

  profilePic: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DriverSchemaModel =mongoose.model("driver_collection", driverSchema);
export default DriverSchemaModel;
