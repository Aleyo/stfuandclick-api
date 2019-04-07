import { Schema } from 'mongoose';

export const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: [{
    session: String,
    clicks: Number,
  }],
  created_date: {
    type: Date,
    default: Date.now,
  },
});
