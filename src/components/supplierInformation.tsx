'use client';

import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
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
import { supplierSchema } from '@/lib/validationSchemas';
import { updateSupplier } from '@/lib/actions';
import { SubmitButton } from './forms/submitButton';
import { createRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Supplier } from '@/lib/types';
import { Switch } from './ui/switch';

const mainPorts = {
  china: ['Shanghai', 'Shenzhen', 'Ningbo', 'Tianjin', 'Qingdao', 'Xiamen'],
  indonesia: ['Jakarta', 'Surabaya', 'Belawan', 'Makassar', 'Semarang'],
  vietnam: ['Ho Chi Minh City', 'Hai Phong', 'Da Nang', 'Qui Nhon', 'Vung Tau'],
  malaysia: ['Port Klang', 'Penang', 'Johor', 'Kuantan', 'Bintulu'],
  india: ['Mumbai', 'Nhava Sheva', 'Kolkata', 'Visakhapatnam', 'Kochi'],
};

export default function SupplierInformation({
  supplier,
}: {
  supplier: Supplier;
}) {
  const [supplierData, setSupplierData] = useState({
    name: supplier.name,
    account: supplier.account,
    address: supplier.address,
    phone: supplier.phone,
    email: supplier.email,
    country: supplier.country,
    port: supplier.port,
    payment: supplier.payment,
    billing: supplier.billing,
    notes: supplier.notes,
    _id: supplier._id,
    id: supplier.id,
    active: supplier.active,
    __v: supplier.__v,
  });
  const [isEditing, setIsEditing] = useState(false);

  const { userId } = useAuth();
  const ref = createRef<HTMLFormElement>();

  const clientAction = async (supplierData: Supplier) => {
    // Client side validation
    const validation = supplierSchema.safeParse(supplierData);
    if (!validation.success) {
      validation.error.issues.map((issue) =>
        toast.error(issue.path[0] + ': ' + issue.message)
      );
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
    <section>
      <div className='flex items-center justify-between'>
        <SectionTitle title='Information' />
        <div className='flex flex-row items-center justify-between rounded-lg border p-2 gap-x-3 mb-6'>
          <p className='font-semibold'>Edit</p>
          <Switch
            className='h-6 w-11'
            checked={isEditing}
            onCheckedChange={() => setIsEditing(!isEditing)}
          />
        </div>
      </div>
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
            disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
              value={supplierData.email}
              onChange={(e) =>
                setSupplierData({ ...supplierData, email: e.target.value })
              }
              type='email'
              placeholder='shinawood@alibaba.com'
            />
          </div>
        </div>
        <div>
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
            disabled={!isEditing}
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
        <div>
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
            disabled={!isEditing}
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
        <div className='flex items-center gap-x-3 justify-start'>
          <div className='w-1/2'>
            <Label htmlFor='payment'>Payment terms</Label>
            <Input
              id='payment'
              name='payment'
              disabled={!isEditing}
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
              disabled={!isEditing}
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
            disabled={!isEditing}
            value={supplierData.notes}
            onChange={(e) =>
              setSupplierData({ ...supplierData, notes: e.target.value })
            }
          />
        </div>
        {isEditing && <SubmitButton />}
      </form>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className='text-xl font-semibold tracking-tight mb-6'>{title}</h2>;
}
