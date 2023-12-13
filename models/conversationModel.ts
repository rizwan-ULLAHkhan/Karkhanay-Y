import mongoose, { Schema, Document } from 'mongoose';

interface IConversation extends Document {
    participant1: Schema.Types.ObjectId;
    participant2: Schema.Types.ObjectId;
    createdAt: Date;
}

const conversationSchema = new Schema({
    participant1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participant1Name: { type: String, required: true }, // Add this line
    participant1Image: { type: String, required: true }, // Add this line
    participant2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participant2Name: { type: String, required: true },
    participant2Image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Change here: Don't call mongoose.model() directly for export
const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', conversationSchema);
export { Conversation };
