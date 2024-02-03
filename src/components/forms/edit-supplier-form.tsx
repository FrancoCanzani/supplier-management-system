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
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supplierValidation } from '@/lib/validationSchemas';
import { updateSupplier } from '@/lib/actions';
import { createRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { mainPorts, incoterms } from '@/lib/data';
import { SubmitButton } from './submit-button';

type Supplier = z.infer<typeof supplierValidation>;

export default function EditSupplierForm({ supplier }: { supplier: Supplier }) {
  const [supplierData, setSupplierData] = useState({
    name: supplier.name,
    account: supplier.account,
    address: supplier.address,
    phone: supplier.phone,
    email: supplier.email,
    country: supplier.country,
    port: supplier.port,
    incoterm: supplier.incoterm,
    payment: supplier.payment,
    billing: supplier.billing,
    notes: supplier.notes,
    _id: supplier._id,
    id: supplier.id,
    status: supplier.status,
  });

  const [isEditing, setIsEditing] = useState(false);

  const { userId } = useAuth();
  const ref = createRef<HTMLFormElement>();

  const clientAction = async (supplierData: Supplier) => {
    // Client side validation
    const validation = supplierValidation.safeParse(supplierData);
    if (!validation.success) {
      validation.error.issues.map((issue) => toast.error(issue.message));
    } else {
      if (userId) {
        const response = await updateSupplier(supplierData, userId);
        if (response?.error) {
          toast.error(response.error);
        } else {
          setIsEditing(false);
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
      action={() => clientAction(supplierData)}
      className='space-y-8 w-full lg:max-w-4xl'
    >
      <div className='flex items-center gap-x-3 justify-start'>
        <div className='w-3/4'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            value={supplierData.name}
            onChange={(e) =>
              setSupplierData({ ...supplierData, name: e.target.value })
            }
            minLength={3}
            autoFocus
            placeholder='Shinawood'
            required
          />
        </div>
        <div className='w-1/4'>
          <Label htmlFor='account'>Account ID</Label>
          <Input
            id='account'
            type='number'
            name='account'
            value={supplierData.account}
            onChange={(e) =>
              setSupplierData({
                ...supplierData,
                account: Number(e.target.value),
              })
            }
            placeholder='446655440000'
          />
        </div>
      </div>
      <div>
        <Label htmlFor='address'>Address</Label>
        <Input
          id='address'
          name='address'
          value={supplierData.address}
          onChange={(e) =>
            setSupplierData({ ...supplierData, address: e.target.value })
          }
          placeholder='No. 801C, Xinjinlong Building, Weijin South Road, Tianjin, China'
        />
      </div>
      <div className='flex items-center gap-x-3 justify-start'>
        <div className='w-1/2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            id='phone'
            name='phone'
            value={supplierData.phone}
            onChange={(e) =>
              setSupplierData({ ...supplierData, phone: e.target.value })
            }
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
            value={supplierData.email}
            onChange={(e) =>
              setSupplierData({ ...supplierData, email: e.target.value })
            }
            type='email'
            placeholder='shinawood@alibaba.com'
          />
        </div>
      </div>
      <div className='flex items-center justify-evenly w-full gap-x-3'>
        <div className='w-1/2'>
          <Label htmlFor='country'>Country</Label>
          <Select
            name='country'
            value={supplierData.country}
            onValueChange={(e) =>
              setSupplierData({
                ...supplierData,
                country: e,
              })
            }
          >
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
          <Select
            name='port'
            value={supplierData.port}
            onValueChange={(e) =>
              setSupplierData({
                ...supplierData,
                port: e,
              })
            }
          >
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
        <Select
          name='incoterm'
          value={supplierData.incoterm}
          onValueChange={(e) =>
            setSupplierData({
              ...supplierData,
              incoterm: e,
            })
          }
        >
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
            value={supplierData.payment}
            onChange={(e) =>
              setSupplierData({ ...supplierData, payment: e.target.value })
            }
            type='text'
            placeholder='10 days after shipping'
          />
        </div>
        <div className='w-1/2'>
          <Label htmlFor='billing'>Billing information</Label>
          <Input
            id='billing'
            name='billing'
            value={supplierData.billing}
            onChange={(e) =>
              setSupplierData({ ...supplierData, billing: e.target.value })
            }
            type='text'
            placeholder='JP Morgan - BKCHCNBJ110'
          />
        </div>
      </div>
      <div>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea
          id='notes'
          name='notes'
          value={supplierData.notes}
          onChange={(e) =>
            setSupplierData({ ...supplierData, notes: e.target.value })
          }
        />
      </div>
      <SubmitButton />
    </form>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className='text-xl font-semibold tracking-tight mb-6'>{title}</h2>;
}
