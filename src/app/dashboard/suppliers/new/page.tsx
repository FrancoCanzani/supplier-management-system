'use client';

import { NewSupplierForm } from '@/components/forms/newSupplierForm';
import { Separator } from '@/components/ui/separator';

export default function NewSupplier() {
  return (
    <div className='space-y-6 p-10 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>New Supplier</h2>
        <p className='text-gray-600'>Supplier data and preferences.</p>
      </div>
      <Separator />
      <NewSupplierForm />
    </div>
  );
}
