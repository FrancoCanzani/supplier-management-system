import mongoose from 'mongoose';

import { nanoid } from 'nanoid';

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    default: () => nanoid(7),
    index: { unique: true },
  },
  account: {
    type: Number,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  port: {
    type: String,
  },
  notes: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  payment: {
    type: String,
  },
  billing: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

// Check if the model already exists before defining it
export const Supplier =
  mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
