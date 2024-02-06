import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  supplier: {
    type: String,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  label: String,
  crd: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'low',
  },
  file: {
    name: String,
    size: Number,
    key: String,
    serverData: {
      uploadedBy: String,
    },
    url: String,
  },
  comments: String,
  incoterm: String,
  currency: String,
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Check if the model already exists before defining it
export const Order =
  mongoose.models.Order || mongoose.model('Order', orderSchema);
