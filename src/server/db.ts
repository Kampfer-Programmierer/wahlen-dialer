import mongoose from 'mongoose';
import { env } from "~/env";

const connectToDatabase = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return mongoose.connection.db;
  }

  try {
    await mongoose.connect(env.DATABASE_URL, {
      // The following options are set by default in Mongoose 6
      // No need to specify `useNewUrlParser` or `useUnifiedTopology`
      // You can add other options if needed, like `useCreateIndex`, etc.
      // Example: 
      // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

// Optional: Export the connection function if you want to use it elsewhere
export const dbConnect = connectToDatabase;
