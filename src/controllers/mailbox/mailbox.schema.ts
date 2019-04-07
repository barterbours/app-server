import { Schema } from "mongoose";

export const MailboxSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  sent: {
    type: Array,
    required: true,
    default: []
  },
  received: {
    type: Array,
    required: true,
    default: []
  }
});
