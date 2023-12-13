import mongoose, { Schema, Document } from 'mongoose';

// Define an interface that extends mongoose.Document

// Define the schema
const messageSchema = new Schema({
  conversationId: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' },
  sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  receiver: { type: String, required: true },
  messageText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export { Message };
