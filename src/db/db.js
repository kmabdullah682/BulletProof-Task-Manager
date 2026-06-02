import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      autoIndex: true,
    });

    console.log("connected to Db");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export { connectDB };
