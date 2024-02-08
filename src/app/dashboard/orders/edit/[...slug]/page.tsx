import { Separator } from '@/components/ui/separator';
import EditOrderForm from '@/components/forms/edit-order-form';
import { Order } from '@/lib/database/schemas/orderSchema';
import dbConnect from '@/lib/database/dbConnect';
import { OrderData, Supplier as SupplierData } from '@/lib/types';
import { auth } from '@clerk/nextjs';
import { Supplier } from '@/lib/database/schemas/supplierSchema';

export default async function EditOrder({
  params,
}: {
  params: { slug: string };
}) {
  const { userId } = auth();

  async function getAllSuppliers(userId: string | null) {
    const db = await dbConnect();

    if (!userId) {
      return [];
    }

    try {
      const suppliers = await Supplier.find({ userId });
      return suppliers;
    } catch (error) {
      throw new Error('Error fetching suppliers from the database');
    }
  }

  const userSuppliersResult = await getAllSuppliers(userId);

  async function getOrder(_id: string) {
    const db = await dbConnect();

    try {
      const order = await Order.findOne({ _id: _id });
      return order;
    } catch (error) {
      return {
        error: 'Error fetching orders from the database',
      };
    }
  }

  const order: OrderData = await getOrder(params.slug);

  return (
    <div className='space-y-6 px-10 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>{order.supplier}</h2>
        <p className='text-gray-600'>
          Edit {order.supplier} {order.id} order
        </p>
      </div>
      <Separator />
      <EditOrderForm order={order} suppliers={userSuppliersResult} />
    </div>
  );
}
