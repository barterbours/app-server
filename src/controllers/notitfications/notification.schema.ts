import { Schema } from "mongoose";

export const NotificationSchema = new Schema({
  notificationGoesTo: {
    type: Array,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true,
    default: Date.now() / 1000
  },
  commonTags: {
    type: Array,
    required: true
  }
});
