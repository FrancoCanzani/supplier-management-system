import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  userId: {
    type: String,
    required: true,
  },
});

// Check if the model already exists before defining it
export const Supplier =
  mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
