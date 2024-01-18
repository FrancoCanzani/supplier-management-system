import dbConnect from '../database/dbConnect';
import { Supplier } from '../database/schemas/supplierSchema';

export async function getSupplier(supplierId: string) {
  const db = await dbConnect();

  try {
    const supplier = await Supplier.findOne({ id: supplierId });
    return supplier;
  } catch (error) {
    return {
      error: 'Error fetching suppliers from the database',
    };
  }
}
