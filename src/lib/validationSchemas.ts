import { object, z } from 'zod';

// An input field returns an empty string even when no input is provided. The required_error property in Zod triggers only if the field is not registered, not when it’s an empty string.

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

const orderValidation = z.object({
  _id: z.string().optional(),
  supplier: z
    .string({
      required_error: 'Select a supplier',
    })
    .min(1, 'Select a supplier'),
  supplierId: z.string().optional(),
  id: z.string().min(1, 'Enter an order number or Id'),
  label: z.string().optional(),
  crd: z.string().or(z.date()).optional(),
  priority: z.string().optional(),
  comments: z.string().optional(),
  incoterm: z.string().min(1, 'Select an incoterm'),
  currency: z.string().min(1, 'Select a currency'),
  file: z
    .object({
      name: z.string(),
      size: z.number(),
      key: z.string(),
      serverData: z.object({
        uploadedBy: z.string(),
      }),
      url: z.string(),
    })
    .optional(),
  status: z.string().optional(),
});

export {
  supplierValidation,
  taskValidation,
  feedbackValidation,
  orderValidation,
};
