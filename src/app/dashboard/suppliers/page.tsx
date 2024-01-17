import { Separator } from '@/components/ui/separator';
import dbConnect from '@/lib/database/dbConnect';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import { SuppliersTable } from '@/components/suppliersTable';
import { columns } from './columns';
import { auth } from '@clerk/nextjs';

export default async function Page() {
  const { userId } = auth();

  async function getAllSuppliers(userId: string) {
    const db = await dbConnect();

    try {
      const suppliers = await Supplier.find({ userId });
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

  if (userId) {
    const userSuppliersResult = await getAllSuppliers(userId);

    return (
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>All Suppliers</h2>
          <p className='text-gray-600'>All suppliers data.</p>
        </div>
        <Separator />
        <SuppliersTable
          data={userSuppliersResult?.data || []}
          columns={columns}
        />
      </div>
    );
  }
}
