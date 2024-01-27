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
  incoterm: {
    type: String,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    default: 'active',
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
