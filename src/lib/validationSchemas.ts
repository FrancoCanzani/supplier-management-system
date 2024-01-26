import { object, z } from 'zod';

const supplierValidation = object({
  _id: z.string().optional(),
  id: z.string().optional(),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Name is a required field',
    }),
  account: z
    .number({ invalid_type_error: 'Account Id must be a number' })
    .int()
    .optional(),
  address: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.union([z.literal(''), z.string().email()]),
  country: z.string().optional(),
  port: z.string().optional(),
  incoterm: z.string().optional(),
  payment: z.string().trim().optional(),
  billing: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  status: z.string().optional(),
});

const taskSchema = object({
  _id: z.string().optional(),
  supplier: z.string().min(3),
  title: z.string().min(3).optional(),
  label: z.string().optional(),
  date: z.date().or(z.string()).optional(),
  priority: z.string().optional(),
  comments: z.string().optional(),
  status: z.string().optional(),
});

export { supplierValidation, taskSchema };
