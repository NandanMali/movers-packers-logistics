import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.log("❌ Connection Error:", err);
  });