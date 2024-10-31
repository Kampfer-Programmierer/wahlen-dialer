import mongoose, { type Document, Schema } from 'mongoose';

interface ICampaign extends Document {
  name: string;
  description?: string;
  assignedAgents: mongoose.Types.ObjectId[];
  status: 'active' | 'inactive';
  createdAt: Date;
}

const campaignSchema = new Schema<ICampaign>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  assignedAgents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.models.Campaign ?? mongoose.model<ICampaign>('Campaign', campaignSchema);

export default Campaign;
