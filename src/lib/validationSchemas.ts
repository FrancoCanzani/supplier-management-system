import { object, string, number, z, date } from 'zod';

const supplierSchema = object({
  name: string().trim(),
  account: number().int().optional(),
  address: string().trim().optional(),
  phone: string().trim().optional(),
  email: string().trim().optional(),
  country: string().trim().optional(),
  port: string().trim().optional(),
  payment: string().trim().optional(),
  billing: string().trim().optional(),
  notes: string().trim().optional(),
});

const taskSchema = object({
  _id: string().optional(),
  supplier: string().min(3),
  title: string().min(3).optional(),
  label: string().optional(),
  date: date().or(z.string()).optional(),
  priority: string().optional(),
  comments: string().optional(),
  status: string().optional(),
});

export { supplierSchema, taskSchema };
