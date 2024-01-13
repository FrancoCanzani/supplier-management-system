import { object, string, number } from 'zod';

const supplierSchema = object({
  name: string().trim(),
  account: number().int().optional(),
  address: string().trim().optional(),
  phone: string().trim().optional(),
  email: string().trim().email().optional(),
  country: string().trim().optional(),
  port: string().trim().optional(),
  notes: string().trim().optional(),
});

export { supplierSchema };
