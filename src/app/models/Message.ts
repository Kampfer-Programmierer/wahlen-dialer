import mongoose, { type Document, Schema } from 'mongoose';

interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  message: string;
  status: string; // e.g., "sent", "delivered"
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
