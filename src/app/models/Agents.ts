import mongoose, { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IAgents extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'agent' | 'supervisor';
  status: 'active' | 'inactive';
  assignedCampaigns: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const AgentsSchema = new Schema<IAgents>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (email: string) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'agent', 'supervisor'],
      default: 'agent',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    assignedCampaigns: { 
      type: [mongoose.Schema.Types.ObjectId], 
      ref: 'Campaign', 
      default: [] 
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model or use an existing one to avoid model overwrite errors in development
const Agents = models.Agents || model<IAgents>('Agents', AgentsSchema);

export default Agents;
