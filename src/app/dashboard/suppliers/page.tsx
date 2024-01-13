import { Separator } from '@/components/ui/separator';
import dbConnect from '@/lib/database/dbConnect';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import { SuppliersTable } from '@/components/suppliersTable';

export default async function Page() {
  async function getAllSuppliers() {
    const db = await dbConnect();

    try {
      const suppliers = await Supplier.find({});
      return {
        success: true,
        data: suppliers,
      };
    } catch (error) {
      return {
        error: 'Error fetching suppliers from the database',
      };
    }
  }

  const result = await getAllSuppliers();

  return (
    <div className='space-y-6 p-10 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>All Suppliers</h2>
        <p className='text-gray-600'>All suppliers data.</p>
      </div>
      <Separator />
      <SuppliersTable data={result.data} />
    </div>
  );
}
