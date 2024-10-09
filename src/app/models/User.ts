import mongoose, { type Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string; // e.g., "agent", "admin"
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['agent', 'admin'], default: 'agent' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Hash the password before saving the user
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare the provided password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
