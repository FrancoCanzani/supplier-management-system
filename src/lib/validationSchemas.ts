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

const taskValidation = object({
  _id: z.string().optional(),
  supplier: z.string({
    required_error: 'Supplier is required',
  }),
  title: z
    .string({
      required_error: 'Title is required',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Title is a required field',
    }),
  label: z.string().optional(),
  date: z.date().or(z.string()).optional(),
  priority: z.string().optional(),
  comments: z.string().optional(),
  status: z.string().optional(),
});

const feedbackValidation = object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  message: z
    .string({
      required_error: 'Message is required',
    })
    .min(3, 'Message must be at least 3 characters'),
});

export { supplierValidation, taskValidation, feedbackValidation };
