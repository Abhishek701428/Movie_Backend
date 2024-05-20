import { Schema, model, Document, Model } from 'mongoose';

interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User: Model<UserDocument> = model<UserDocument>('User', userSchema);

export { User, UserDocument };
