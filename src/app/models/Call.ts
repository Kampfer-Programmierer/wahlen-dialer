import mongoose, { type Document, Schema } from 'mongoose';

interface ICall extends Document {
  callerId: string;
  receiverId: string;
  status: string; // e.g., "completed", "failed"
  duration: number;
  timestamp: Date;
}

const CallSchema = new Schema<ICall>({
  callerId: { type: String, required: true },
  receiverId: { type: String, required: true },
  status: { type: String, required: true },
  duration: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Call = mongoose.model<ICall>('Call', CallSchema);

export default Call;
