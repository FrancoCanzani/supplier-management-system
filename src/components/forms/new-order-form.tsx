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
import { addOrder, deleteFiles } from '@/lib/actions';
import { OrderData } from '@/lib/types';
import { UploadDropzone } from '@/lib/uploadthing';

export function NewOrderForm({ suppliers }: { suppliers: Supplier[] }) {
  const [selectedSupplier, setSelectedSupplier] = useState<{
    name: string;
    id: string;
  }>({ name: '', id: '' });
  const [uploadedFile, setUploadedFile] = useState<
    Array<{
      name: string;
      size: number;
      key: string;
      serverData: {
        uploadedBy: string;
      };
      url: string;
    }>
  >([]);

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
      file: uploadedFile,
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

  const handleDeleteFiles = async (key: string) => {
    try {
      await deleteFiles(key);
      toast.success('File dropped');
      setUploadedFile([]);
    } catch (error) {
      toast.error('Error deleting file');
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
        {uploadedFile.length === 0 ? (
          <UploadDropzone
            appearance={{
              button:
                'rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 rounded-md px-3 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 ut-ready:bg-green-500 ut-ready:animate-pulse ut-ready:hover:bg-green-600 ut-uploading:cursor-not-allowed ut-uploading:bg-green-600 after:bg-green-700',
              container: 'py-5',
              allowedContent: '',
            }}
            endpoint='spreadsheetUploader'
            onClientUploadComplete={(res) => {
              setUploadedFile((prevUploadedFile) => [
                ...prevUploadedFile,
                ...res,
              ]);
              toast.success('Upload Completed');
            }}
            onUploadError={(error: Error) => {
              toast.error(`Error! ${error.message}`);
            }}
          />
        ) : (
          <button
            onClick={() => handleDeleteFiles(uploadedFile[0].key)}
            type='button'
            className='mt-2 flex text-sm flex-col items-center justify-center rounded-md w-full border border-dashed border-gray-900/25 px-6 text-center py-5'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
              className='mx-auto block h-12 w-12 align-middle text-gray-400'
            >
              <g fill='none'>
                <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
                <path
                  fill='currentColor'
                  d='M9.52 3a2 2 0 0 1 1.442.614l.12.137L12.48 5.5H20a2 2 0 0 1 1.995 1.85L22 7.5V19a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19V5a2 2 0 0 1 1.85-1.995L4 3zm0 2H4v14h16V7.5h-7.52a2 2 0 0 1-1.442-.614l-.12-.137zm1.066 5.172L12 11.586l1.414-1.414a1 1 0 1 1 1.415 1.414L13.414 13l1.415 1.414a1 1 0 1 1-1.415 1.414L12 14.414l-1.414 1.414a1 1 0 1 1-1.414-1.414L10.586 13l-1.414-1.414a1 1 0 1 1 1.414-1.414'
                />
              </g>
            </svg>
            <span className='text-red-600 hover:text-red-500 relative mt-4 flex w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6'>
              Drop file
            </span>
            <span className='m-0 h-[1.25rem] text-xs leading-5 text-gray-600'>
              {uploadedFile[0].name}
            </span>
          </button>
        )}
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
