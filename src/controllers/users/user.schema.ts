import { Schema } from "mongoose";

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: false
  },
  wants: {
    type: Array,
    required: true,
    default: []
  },
  offers: {
    type: Array,
    required: true,
    default: []
  },
  homePoint: {
    type: Object,
    required: true,
    default: { latitude: 0, longitude: 0 }
  },
  radius: {
    type: Number,
    required: true,
    default: 500
  },
  matchesWithUsers: {
    type: Array,
    required: true,
    default: []
  },
  mailBoxID: {
    type: Number,
    required: true
  },
  includeInMatching: {
    type: Boolean,
    required: true,
    default: false
  }
});
