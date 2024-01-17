import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  supplier: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  date: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
  },
  comments: {
    type: String,
  },
  status: {
    type: String,
    default: 'open',
  },
  userId: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
