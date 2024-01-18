'use client';

import { NewSupplierForm } from '@/components/forms/newSupplierForm';
import { Separator } from '@/components/ui/separator';

export default function NewSupplier() {
  return (
    <div className='space-y-6 px-10 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>New Supplier</h2>
        <p className='text-gray-600'>Supplier data and preferences.</p>
      </div>
      <Separator className='w-full lg:max-w-4xl' />
      <NewSupplierForm />
    </div>
  );
}
