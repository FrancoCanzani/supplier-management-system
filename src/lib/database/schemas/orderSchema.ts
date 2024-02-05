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
  comments: String,
  incoterm: String,
  currency: String,
  userId: {
    type: String,
    required: true,
  },
});

// Check if the model already exists before defining it
export const Order =
  mongoose.models.Order || mongoose.model('Order', orderSchema);
