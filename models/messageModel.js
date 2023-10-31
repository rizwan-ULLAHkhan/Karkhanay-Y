import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User' // assuming you have a User model
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  }
});

const Message = model('Message', messageSchema);

export default Message;
