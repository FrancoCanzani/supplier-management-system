import { Separator } from '@/components/ui/separator';
import dbConnect from '@/lib/database/dbConnect';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import { columns } from './columns';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { SuppliersTable } from '@/components/tables/suppliers-table';

export default async function Suppliers() {
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
        <div className='flex items-end justify-between w-full'>
          <div className='space-y-0.5'>
            <h2 className='text-2xl font-bold tracking-tight'>All Suppliers</h2>
            <p className='text-gray-600'>All suppliers data.</p>
          </div>
          <Link
            href={'/dashboard/suppliers/new'}
            className='inline-flex lg:hidden items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2 justify-start'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 16 16'
              className='mr-2 h-4 w-4'
            >
              <path
                fill='currentColor'
                d='M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0M6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8M.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z'
              />
            </svg>
            New Supplier
          </Link>
        </div>
        <Separator />
        <div className='container mx-auto py-4'>
          <SuppliersTable
            data={userSuppliersResult?.data || []}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}
