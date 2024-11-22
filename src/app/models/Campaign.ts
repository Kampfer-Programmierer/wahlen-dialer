import mongoose, { type Document, Schema } from "mongoose";

interface ICampaign extends Document {
  name: string;
  description?: string;
  assignedAgents: mongoose.Types.ObjectId[];
  status: "active" | "inactive" | "paused" | "completed"; // Added "paused" and "completed"
  startDate: Date;
  endDate: Date;
  callScript: string;
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    assignedAgents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "paused", "completed"], // Added "paused" and "completed"
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    callScript: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

const Campaign =
  mongoose.models.Campaign ??
  mongoose.model<ICampaign>("Campaign", campaignSchema);

export default Campaign;
