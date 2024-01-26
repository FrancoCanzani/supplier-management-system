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
import { supplierValidation } from '@/lib/validationSchemas';
import { addSupplier } from '@/lib/actions';
import { SubmitButton } from './submitButton';
import { createRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { incoterms, mainPorts } from '@/lib/data';

export function NewSupplierForm() {
  const { userId } = useAuth();

  const ref = createRef<HTMLFormElement>();

  const clientAction = async (formData: FormData) => {
    const supplierData = {
      name: formData.get('name'),
      account: Number(formData.get('account')),
      address: formData.get('address'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      country: formData.get('country'),
      port: formData.get('port'),
      incoterm: formData.get('incoterm'),
      payment: formData.get('payment'),
      billing: formData.get('billing'),
      notes: formData.get('notes'),
    };

    // Client side validation
    const validation = supplierValidation.safeParse(supplierData);
    if (!validation.success) {
      validation.error.issues.map((issue) => toast.error(issue.message));
    } else {
      if (userId) {
        const response = await addSupplier(formData, userId);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('Supplier saved successfully!');
          if (ref.current) {
            ref.current.reset();
          }
        }
      }
    }
  };

  return (
    <form
      ref={ref}
      action={clientAction}
      className='space-y-8 w-full lg:max-w-4xl'
    >
      <div className='flex items-center gap-x-3 justify-start'>
        <div className='w-3/4'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            minLength={3}
            autoFocus
            placeholder='Shinawood'
          />
        </div>
        <div className='w-1/4'>
          <Label htmlFor='account'>Account ID</Label>
          <Input
            id='account'
            type='number'
            name='account'
            placeholder='446655440000'
          />
        </div>
      </div>
      <div>
        <Label htmlFor='address'>Address</Label>
        <Input
          id='address'
          name='address'
          placeholder='No. 801C, Xinjinlong Building, Weijin South Road, Tianjin, China'
        />
      </div>
      <div className='flex items-center gap-x-3 justify-evenly'>
        <div className='w-1/2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            id='phone'
            name='phone'
            type='tel'
            placeholder='010 6552 9988'
            min={6}
            max={15}
          />
        </div>
        <div className='w-1/2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='shinawood@alibaba.com'
          />
        </div>
      </div>
      <div className='flex items-center justify-evenly w-full gap-x-3'>
        <div className='w-1/2'>
          <Label htmlFor='country'>Country</Label>
          <Select name='country'>
            <SelectTrigger>
              <SelectValue placeholder='Select suppliers country' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Country</SelectLabel>
                <SelectItem value='china'>China</SelectItem>
                <SelectItem value='india'>India</SelectItem>
                <SelectItem value='indonesia'>Indonesia</SelectItem>
                <SelectItem value='malaysia'>Malaysia</SelectItem>
                <SelectItem value='vietnam'>Vietnam</SelectItem>
                <SelectItem value='spain'>Spain</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='w-1/2'>
          <Label htmlFor='port'>Port</Label>
          <Select name='port'>
            <SelectTrigger>
              <SelectValue placeholder='Select suppliers port' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>China</SelectLabel>
                {mainPorts.china.map((port) => (
                  <SelectItem key={port} value={port.toLowerCase()}>
                    {port}
                  </SelectItem>
                ))}
                <SelectLabel>Indonesia</SelectLabel>
                {mainPorts.indonesia.map((port) => (
                  <SelectItem key={port} value={port.toLowerCase()}>
                    {port}
                  </SelectItem>
                ))}
                <SelectLabel>India</SelectLabel>
                {mainPorts.india.map((port) => (
                  <SelectItem key={port} value={port.toLowerCase()}>
                    {port}
                  </SelectItem>
                ))}
                <SelectLabel>Malaysia</SelectLabel>
                {mainPorts.malaysia.map((port) => (
                  <SelectItem key={port} value={port.toLowerCase()}>
                    {port}
                  </SelectItem>
                ))}
                <SelectLabel>Vietnam</SelectLabel>
                {mainPorts.vietnam.map((port) => (
                  <SelectItem key={port} value={port.toLowerCase()}>
                    {port}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor='incoterm'>
          <a
            href='https://en.wikipedia.org/wiki/Incoterms'
            target='_blank'
            className='text-blue-700'
          >
            Incoterm
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
      <div className='flex items-center gap-x-3 justify-start'>
        <div className='w-1/2'>
          <Label htmlFor='payment'>Payment terms</Label>
          <Input
            id='payment'
            name='payment'
            type='text'
            placeholder='10 days after shipping'
          />
        </div>
        <div className='w-1/2'>
          <Label htmlFor='billing'>Billing information</Label>
          <Input
            id='billing'
            name='billing'
            type='text'
            placeholder='JP Morgan - BKCHCNBJ110'
          />
        </div>
      </div>
      <div>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea id='notes' name='notes' />
      </div>
      <SubmitButton />
    </form>
  );
}
