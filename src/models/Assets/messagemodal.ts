import { Schema, model, Document } from 'mongoose';

export interface MessageDocument extends Document {
    username: string;
    text: string;
    createdAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
    username: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model<MessageDocument>('Message', messageSchema);
