import { Separator } from '@/components/ui/separator';
import { NewTaskForm } from '@/components/forms/newTaskForm';
import dbConnect from '@/lib/database/dbConnect';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function NewTask() {
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
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const userSuppliersResult = await getAllSuppliers(session.user.id);

    return (
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>New Task</h2>
          <p className='text-gray-600'>Turn your ideas into actions.</p>
        </div>
        <Separator className='w-full lg:max-w-4xl' />
        <NewTaskForm suppliers={userSuppliersResult.data ?? []} />
      </div>
    );
  }
}
