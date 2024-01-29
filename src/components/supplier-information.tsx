import { supplierValidation } from '@/lib/validationSchemas';
import z from 'zod';
import Link from 'next/link';

type Supplier = z.infer<typeof supplierValidation>;

export default function SupplierInformation({
  supplier,
}: {
  supplier: Supplier;
}) {
  return (
    <div>
      <div className='flex items-center justify-between w-full mb-3'>
        <h3 className='text-lg font-semibold tracking-tight'>
          Supplier Information
        </h3>
        <Link
          href={`/dashboard/suppliers/edit/${supplier.id}`}
          className='inline-flex font-medium text-sm lg:text-base items-center rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2 justify-start'
        >
          Edit Supplier
        </Link>
      </div>
      <section className='bg-gray-50 rounded-md border shadow-sm gap-y-4 p-6 text-sm'>
        {supplier.name && (
          <>
            <h3 className='text-lg font-semibold tracking-tight mb-3'>
              General
            </h3>
            <div className='flex items-center justify-start flex-col sm:flex-row sm:space-x-6 mb-6'>
              <p className='capitalize mb-2 w-full sm:w-fit sm:mb-0'>
                <span className='font-semibold italic'>Name:</span>{' '}
                {supplier.name}
              </p>
              {supplier.account && (
                <p className='capitalize mb-2 w-full sm:w-fit sm:mb-0'>
                  <span className='font-semibold italic'>Account Id:</span>{' '}
                  {supplier.account}
                </p>
              )}
            </div>
          </>
        )}
        {supplier.address && (
          <>
            <h3 className='text-lg font-semibold tracking-tight mb-3'>
              Address and contact
            </h3>
            <div className='flex items-center justify-start flex-col mb-6'>
              <p className='w-full mb-2'>
                <span className='font-semibold italic'>Address:</span>{' '}
                {supplier.address}
              </p>
              {(supplier.email || supplier.phone) && (
                <div className='flex items-center justify-start w-full flex-col sm:flex-row sm:space-x-6'>
                  {supplier.email && (
                    <p className='capitalize mb-2 w-full sm:w-fit sm:mb-0'>
                      <span className='font-semibold italic'>Email:</span>{' '}
                      {supplier.email}
                    </p>
                  )}
                  {supplier.phone && (
                    <p className='capitalize mb-2 w-full sm:w-fit sm:mb-0'>
                      <span className='font-semibold italic'>Phone:</span>{' '}
                      {supplier.phone}
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {(supplier.country || supplier.port) && (
          <>
            <h3 className='text-lg font-semibold tracking-tight mb-3 w-full'>
              Location
            </h3>
            <div className='flex items-center justify-start space-x-6 w-full mb-6'>
              {supplier.country && (
                <p className='capitalize mb-2 w-full md:w-fit md:mb-0'>
                  <span className='font-semibold italic'>Country:</span>{' '}
                  {supplier.country}
                </p>
              )}
              {supplier.port && (
                <p className='capitalize mb-2 w-full md:w-fit md:mb-0'>
                  <span className='font-semibold italic'>Port:</span>{' '}
                  {supplier.port}
                </p>
              )}
            </div>
          </>
        )}

        {supplier.incoterm && (
          <>
            <h3 className='text-lg font-semibold tracking-tight mb-3 w-full'>
              Incoterm
            </h3>
            <p className='capitalize w-full mb-6'>{supplier.incoterm}</p>
          </>
        )}

        {(supplier.payment || supplier.billing) && (
          <>
            <h3 className='text-lg font-semibold tracking-tight mb-3 w-full'>
              Billing
            </h3>
            <div className='flex items-center justify-start w-full flex-col sm:flex-row sm:space-x-6 mb-6'>
              {supplier.payment && (
                <p className='capitalize mb-2 w-full sm:w-fit sm:mb-0'>
                  <span className='font-semibold italic'>Payment:</span>{' '}
                  {supplier.payment}
                </p>
              )}
              {supplier.billing && (
                <p className='capitalize mb-2 w-full sm:w-fit sm:mb-0'>
                  <span className='font-semibold italic'>Billing:</span>{' '}
                  {supplier.billing}
                </p>
              )}
            </div>
          </>
        )}

        {supplier.notes && (
          <>
            <h3 className='text-lg font-semibold tracking-tight mb-3 w-full'>
              Notes
            </h3>
            <p>{supplier.notes}</p>
          </>
        )}
      </section>
    </div>
  );
}
