/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Schema, model, models, type Document, type Types, type Model } from 'mongoose';

// Define an interface for the Agent document
interface IAgent extends Document {
    name: string;
    employeeId: string;
    phoneNumber: string;
    email: string;
    role: Types.ObjectId; // Reference to Role schema
    status: 'active' | 'inactive' | 'on-leave' | 'on-call';
    createdAt: Date;
    updatedAt: Date;
}

// Agent schema definition
const agentSchema = new Schema<IAgent>({
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    status: { type: String, enum: ['active', 'inactive', 'on-leave', 'on-call'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const Agent: Model<IAgent> = models.Agent ?? model<IAgent>('Agent', agentSchema);

export {Agent, type IAgent};