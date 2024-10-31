import mongoose, { type Document, Schema } from 'mongoose';

// Define an interface for the Customer document
interface ICustomer extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  address?: string; // Optional address field
  assignedCampaigns: mongoose.Types.ObjectId[]; // Array of campaign IDs this customer is assigned to
  createdAt: Date;
}

// Customer schema definition
const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true }, // Required name field
  phoneNumber: { type: String, required: true, unique: true }, // Required and unique phone number
  email: { type: String, required: true, unique: true }, // Required and unique email
  address: { type: String, default: '' }, // Optional address field
  assignedCampaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign', // Reference to Campaign model
  }],
  createdAt: { type: Date, default: Date.now }, // Created at timestamp
});

// Check if the model already exists, and use it if so
const Customer = mongoose.models.Customer ?? mongoose.model<ICustomer>('Customer', customerSchema);

// Export the model and interface
export default Customer;
export type { ICustomer };
