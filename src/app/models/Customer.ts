import mongoose, { type Document, Schema } from "mongoose";

// Define an interface for the Customer document
interface ICustomer extends Document {
  name: string; // Customer name
  phone: string; // Customer phone number
  email?: string; // Optional email
  location?: string; // Optional geographic location
  priority?: string; // Optional call priority level
  status: string; // Status of the call
  notes: string; // Additional notes for the customer
  assignedCampaigns: mongoose.Types.ObjectId[]; // Array of campaign IDs this customer is assigned to
  createdAt: Date; // Timestamp for record creation
  updatedAt: Date; // Timestamp for record update
}

// Customer schema definition
const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true }, // Required name field
    phone: { type: String, required: true }, // Required and unique phone number
    email: { type: String, default: ""}, // Optional and unique email
    location: { type: String, default: "" }, // Optional geographic location
    priority: { type: String, enum: ["low", "mid", "high"], default: "low" }, // Optional call priority level
    status: {
      type: String,
      required: true,
      enum: ["failed", "completed", "pending"],
      default: "pending",
    }, // Status of the call
    notes: { type: String, default: "" }, // Additional notes for the customer
    assignedCampaigns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign", // Reference to Campaign model
        default: [],
      },
    ],
    createdAt: { type: Date, default: Date.now }, // Created at timestamp
    updatedAt: { type: Date, default: Date.now }, // Updated at timestamp
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Check if the model already exists, and use it if so
const Customer =
  mongoose.models.Customer ??
  mongoose.model<ICustomer>("Customer", customerSchema);

// Export the model and interface
export default Customer;
export type { ICustomer };
