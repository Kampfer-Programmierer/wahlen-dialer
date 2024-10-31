import mongoose, { type Document, Schema } from 'mongoose';

// Define an enum for call status
enum CallStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
  FAILED = 'failed',
}

interface ICall extends Document {
  agent: mongoose.Types.ObjectId;
  campaign: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  status: CallStatus;
  duration: number;
  createdAt: Date;
}

const CallSchema = new Schema<ICall>(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CallStatus), // Use the enum values for validation
      required: true,
    },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

const Call = mongoose.models.Call ?? mongoose.model<ICall>('Call', CallSchema);

export default Call;
