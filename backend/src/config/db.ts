import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = db.connections[0]?.readyState === 1;
    console.log('MongoDB Connected');
  } catch (err: any) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    // Don't exit process in Serverless
  }
};

export default connectDB;
