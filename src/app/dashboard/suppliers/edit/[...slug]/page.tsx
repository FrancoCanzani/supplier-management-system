import { Supplier as SupplierProps } from '@/lib/types';
import { getSupplier } from '@/lib/helpers/getSupplier';
import { Separator } from '@/components/ui/separator';

import EditSupplierForm from '@/components/forms/edit-supplier-form';

export default async function EditSupplier({
  params,
}: {
  params: { slug: string };
}) {
  const supplier: SupplierProps = await getSupplier(params.slug);

  return (
    <div className='space-y-6 px-10 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>{supplier.name}</h2>
        <p className='text-gray-600'>Edit {supplier.name}&apos;s data</p>
      </div>
      <Separator />
      <EditSupplierForm supplier={supplier} />
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className='text-xl font-semibold tracking-tight mb-3'>{title}</h2>;
}
