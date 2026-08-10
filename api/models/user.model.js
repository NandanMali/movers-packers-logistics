import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true,"Name is required"],
    lowercase: true,
    trim: true,
  },
  username:{
    type: String,
    required:[true,"Username is required"],
    unique:true,
    lowercase:true,
    trim:true,
  },
  email: {
    type: String,
    required: [true,"Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true,"Password is required"],
    maxlength: 10,
    minlength: 5,
    trim: true
  },
  phone: {
    type: Number,
    required: [true,"Phone Number is required"],
    maxlength: 10,
    minlength:10,
    trim: true
  },
  address: {
    type: String,
    // required: [true,"Address is required"],
    trim: true
  },
  role: String,
  status: {
    type:Boolean,
  default:false
},
  ProfilePic: {
    type: String,
    trim: true,
    lowercase: true,
  },
  info: String,
  otp:String,
  otpExpires:Date,

});


// compile schema to model
const UserSchemaModel = mongoose.model('All_info_collection',UserSchema);

export default UserSchemaModel;