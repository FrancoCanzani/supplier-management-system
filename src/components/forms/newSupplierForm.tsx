import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
import { toast } from '@/components/ui/use-toast';

const mainPorts = {
  china: ['Shanghai', 'Shenzhen', 'Ningbo', 'Tianjin', 'Qingdao', 'Xiamen'],
  indonesia: ['Jakarta', 'Surabaya', 'Belawan', 'Makassar', 'Semarang'],
  vietnam: ['Ho Chi Minh City', 'Hai Phong', 'Da Nang', 'Qui Nhon', 'Vung Tau'],
  malaysia: ['Port Klang', 'Penang', 'Johor Port', 'Kuantan', 'Bintulu'],
  india: ['Mumbai', 'Nhava Sheva', 'Kolkata', 'Visakhapatnam', 'Kochi'],
};

export function NewSupplierForm() {
  return (
    <form className='space-y-8 w-full lg:max-w-4xl'>
      <div className='flex items-center gap-x-3 justify-start'>
        <div className='w-3/4'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' autoFocus placeholder='Shinawood' />
        </div>
        <div className='w-1/4'>
          <Label htmlFor='account'>Account ID</Label>
          <Input id='account' autoFocus placeholder='446655440000' />
        </div>
      </div>
      <div>
        <Label htmlFor='adress'>Adress</Label>
        <Input
          id='adress'
          autoFocus
          placeholder='No. 801C, Xinjinlong Building, Weijin South Road, Tianjin, China'
        />
      </div>
      <div className='flex items-center gap-x-3 justify-start'>
        <div className='w-1/2'>
          <Label htmlFor='phone'>Contact</Label>
          <Input id='phone' type='tel' autoFocus placeholder='010 6552 9988' />
        </div>
        <div className='w-1/2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            autoFocus
            placeholder='shinawood@alibaba.com'
          />
        </div>
      </div>
      <div>
        <Label htmlFor='country'>Country</Label>
        <Select>
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
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select suppliers country' />
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
      <div>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea />
      </div>
      <Button type='submit'>Save</Button>
    </form>
  );
}
