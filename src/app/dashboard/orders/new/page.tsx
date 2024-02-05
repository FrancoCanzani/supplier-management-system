import { Separator } from '@/components/ui/separator';
import dbConnect from '@/lib/database/dbConnect';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import { auth } from '@clerk/nextjs';
import { NewOrderForm } from '@/components/forms/new-order-form';

export default async function NewOrder() {
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
      <div className='space-y-6 px-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>New Order</h2>
          <p className='text-gray-600'>Your supplier purchase order.</p>
        </div>
        <Separator />
        <NewOrderForm suppliers={userSuppliersResult.data ?? []} />
      </div>
    );
  }
}
