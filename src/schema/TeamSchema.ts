import { Schema } from 'mongoose';

export const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
