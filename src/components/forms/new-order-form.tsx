'use client';

import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { orderValidation } from '@/lib/validationSchemas';
import { SubmitButton } from './submit-button';
import { createRef } from 'react';
import { Supplier } from '@/lib/types';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { DataSelector } from './data-selector';
import { currencies, incoterms } from '@/lib/data';
import { addOrder } from '@/lib/actions';
import { OrderData } from '@/lib/types';
import { UploadDropzone } from '@/lib/uploadthing';

export function NewOrderForm({ suppliers }: { suppliers: Supplier[] }) {
  const [selectedSupplier, setSelectedSupplier] = useState<{
    name: string;
    id: string;
  }>({ name: '', id: '' });

  const today = new Date().toISOString().split('T')[0];
  const ref = createRef<HTMLFormElement>();
  const { userId } = useAuth();

  //   formData.get method returns string | File, we should explicitly coerce type to string to get the field values

  const clientAction = async (formData: FormData) => {
    const orderData: OrderData = {
      supplier: selectedSupplier.name,
      supplierId: selectedSupplier.id,
      id: String(formData.get('id')) || '',
      label: formData.get('label')?.toString() ?? '',
      crd: formData.get('crd')?.toString() || today,
      priority: formData.get('priority')?.toString() || 'low',
      comments: formData.get('comments')?.toString() ?? '',
      incoterm: formData.get('incoterm')?.toString() ?? '',
      currency: formData.get('currency')?.toString() ?? '',
    };

    const validation = orderValidation.safeParse(orderData);

    if (!validation.success) {
      validation.error.issues.map((issue) => toast.error(issue.message));
    } else {
      if (userId) {
        const response = await addOrder(orderData, userId);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('Order saved successfully!');
          if (ref.current) {
            ref.current.reset();
          }
        }
      }
    }
  };

  return (
    <form ref={ref} action={clientAction} className='space-y-6 w-full'>
      <div className='flex flex-col'>
        <Label htmlFor='supplier' className='mb-1.5'>
          Supplier*
        </Label>
        <DataSelector
          data={suppliers}
          placeholder='Suppliers'
          onSelect={setSelectedSupplier}
        />
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-start sm:gap-x-2 space-y-6 sm:space-y-0 w-full'>
        <div className='sm:w-1/2 w-full'>
          <Label htmlFor='id'>PO#*</Label>
          <Input
            id='id'
            name='id'
            type='text'
            minLength={3}
            placeholder='W04'
          />
        </div>
        <div className='sm:w-1/2 w-full'>
          <Label htmlFor='label'>Label</Label>
          <Input id='label' name='label' placeholder='Summer' />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-start sm:gap-x-2 space-y-6 sm:space-y-0 w-full'>
        <div className='sm:w-1/2 w-full'>
          <Label htmlFor='incoterm'>
            <a
              href='https://en.wikipedia.org/wiki/Incoterms'
              target='_blank'
              className='text-blue-700'
            >
              Incoterm*
            </a>
          </Label>
          <Select name='incoterm'>
            <SelectTrigger>
              <SelectValue placeholder="Select supplier's incoterm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {incoterms.map((incoterm) => (
                  <SelectItem key={incoterm} value={incoterm.toLowerCase()}>
                    {incoterm}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='sm:w-1/2 w-full'>
          <Label htmlFor='currency'>Currency*</Label>
          <Select name='currency'>
            <SelectTrigger>
              <SelectValue placeholder='Select currency' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency.toLowerCase()}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-start sm:gap-x-2 space-y-6 sm:space-y-0 w-full'>
        <div className='sm:w-1/2 w-full'>
          <Label htmlFor='date'>Cargo Ready Date</Label>
          <Input id='crd' name='crd' type='date' min={today} />
        </div>
        <div className='sm:w-1/2 w-full'>
          <Label htmlFor='priority'>Priority</Label>
          <Select name='priority'>
            <SelectTrigger>
              <SelectValue placeholder='Select order priority' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value='high'> High</SelectItem>
                <SelectItem value='medium'> Medium</SelectItem>
                <SelectItem value='low'>Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor='file'>File (spreadsheet)</Label>
        <UploadDropzone
          appearance={{
            button:
              'rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 rounded-md px-3 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 ut-ready:bg-green-500 ut-ready:hover:bg-green-600 ut-uploading:cursor-not-allowed ut-uploading:bg-green-600 after:bg-green-700',
            container: 'py-5',
            allowedContent: '',
          }}
          endpoint='spreadsheetUploader'
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log('Files: ', res);
            toast.success('Upload Completed');
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <div>
        <Label htmlFor='comments'>Comments</Label>
        <Textarea id='comments' name='comments' />
      </div>

      <div className='space-y-1'>
        <p className='text-sm text-gray-600'>
          ▪️ You will be able to add the products later.
        </p>
        <p className='text-gray-600 text-sm'>
          ▪️{' '}
          <a
            className='underline'
            href='/public/purchase-order-template.xlsx'
            download
          >
            Download
          </a>{' '}
          a purchase order template.
        </p>
      </div>
      <SubmitButton />
    </form>
  );
}
