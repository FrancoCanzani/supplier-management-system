'use server';

import { supplierSchema } from './validationSchemas';
import { Supplier } from './database/schemas/supplierSchema';
import dbConnect from './database/dbConnect';

async function addSupplier(formData: FormData) {
  const db = await dbConnect();

  const supplierData = {
    name: formData.get('name'),
    account: Number(formData.get('account')),
    address: formData.get('address'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    country: formData.get('country'),
    port: formData.get('port'),
    notes: formData.get('notes'),
  };

  const validation = supplierSchema.safeParse(supplierData);
  if (!validation.success) {
    let errorMessage = '';
    validation.error.issues.map(
      (issue) =>
        (errorMessage =
          errorMessage + issue.path[0] + ': ' + issue.message + '. ')
    );

    return {
      error: errorMessage,
    };
  }

  const { name, account } = supplierData;

  // Check if the supplier account exists (don't throw an error if both are 0)
  if (account) {
    const existingSupplier = await Supplier.findOne({ name, account });
    if (existingSupplier) {
      return {
        error: 'Supplier with the same account already exists',
      };
    }
  }

  try {
    const newSupplier = new Supplier(supplierData);
    const savedSupplier = await newSupplier.save();

    return {
      success: true,
      data: savedSupplier,
    };
  } catch (error) {
    return {
      error: 'Error adding supplier to the database',
    };
  }
}

export { addSupplier };
