import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL || '';

if (!MONGODB_URI) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env');
}

let isConnected = false; // Track connection state

export const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI); // Defaults are sufficient
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};
