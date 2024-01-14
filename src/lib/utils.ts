import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dbConnect from './database/dbConnect';
import { Supplier } from './database/schemas/supplierSchema';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
