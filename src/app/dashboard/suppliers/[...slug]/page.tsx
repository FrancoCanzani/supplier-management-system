import { Supplier as SupplierProps } from '@/lib/types';
import { getSupplier } from '@/lib/helpers/getSupplier';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import dbConnect from '@/lib/database/dbConnect';
import { Task } from '@/lib/database/schemas/taskSchema';
import SupplierAnalytics from '@/components/supplier-Analytics';
import SupplierInformationForm from '@/components/forms/supplier-Information-form';
import { TasksTable } from '@/components/tables/tasks-Table';

export default async function SupplierPage({
  params,
}: {
  params: { slug: string };
}) {
  const supplier: SupplierProps = await getSupplier(params.slug);

  await dbConnect();

  const tasks = await Task.find({ supplierId: supplier.id });

  return (
    <div className='space-y-6 px-10 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>{supplier.name}</h2>
        <p className='text-gray-600'>All {supplier.name}&apos;s data</p>
      </div>
      <Separator />
      <SupplierInformationForm supplier={supplier} />
      {tasks.length > 0 && (
        <>
          <Separator />
          <section>
            <SectionTitle title='Tasks' />
            <div className='container mx-auto py-4'>
              <TasksTable columns={columns} data={tasks} />
            </div>
          </section>
          <Separator />
          <section>
            <SectionTitle title='Analytics' />
            <SupplierAnalytics tasks={tasks} />
          </section>
        </>
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className='text-xl font-semibold tracking-tight mb-3'>{title}</h2>;
}
