import { Supplier as SupplierProps } from '@/lib/types';
import { getSupplier } from '@/lib/helpers/getSupplier';
import { Separator } from '@/components/ui/separator';
import { TasksTable } from '@/components/tasksTable';
import { columns } from './columns';
import dbConnect from '@/lib/database/dbConnect';
import { Task } from '@/lib/database/schemas/taskSchema';
import SupplierInformation from '@/components/supplierInformation';

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
      <SupplierInformation supplier={supplier} />
      <Separator />
      <section>
        <SectionTitle title='Tasks' />
        <TasksTable columns={columns} data={tasks} />
      </section>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className='text-xl font-semibold tracking-tight mb-3'>{title}</h2>;
}
