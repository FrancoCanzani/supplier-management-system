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
import { taskValidation } from '@/lib/validationSchemas';
import { SubmitButton } from './submitButton';
import { createRef } from 'react';
import { DataSelector } from '../dataSelector';
import { Supplier } from '@/lib/types';
import { useState } from 'react';
import { addTask } from '@/lib/actions';
import { useAuth } from '@clerk/nextjs';

export function NewTaskForm({ suppliers }: { suppliers: Supplier[] }) {
  const [selectedSupplier, setSelectedSupplier] = useState<{
    name: string;
    id: string;
  }>({ name: '', id: '' });

  const today = new Date().toISOString().split('T')[0];
  const ref = createRef<HTMLFormElement>();
  const { userId } = useAuth();

  const clientAction = async (formData: FormData) => {
    const taskData = {
      supplier: selectedSupplier.name.toString(),
      supplierId: selectedSupplier.id.toString(),
      title: formData.get('title') ?? '',
      label: formData.get('label') ?? '',
      date: formData.get('date') ?? new Date().toISOString(),
      priority: formData.get('priority') ?? '',
      comments: formData.get('comments') ?? '',
    };

    // Client side validation
    const validation = taskValidation.safeParse(taskData);
    if (!validation.success) {
      validation.error.issues.map((issue) =>
        toast.error(issue.path[0] + ': ' + issue.message)
      );
    } else {
      if (userId) {
        const response = await addTask(taskData, userId);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('Task saved successfully!');
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
      <div className='flex flex-col'>
        <Label htmlFor='supplier' className='mb-1.5'>
          Supplier
        </Label>
        <DataSelector
          data={suppliers}
          placeholder='Suppliers'
          onSelect={setSelectedSupplier}
        />
      </div>
      <div className='flex items-center justify-start gap-x-2'>
        <div className='w-3/4'>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            name='title'
            minLength={3}
            placeholder='Advance container cargo ready date'
            required
          />
        </div>
        <div className='w-1/4'>
          <Label htmlFor='label'>Label</Label>
          <Input id='label' name='label' required placeholder='Documentation' />
        </div>
      </div>
      <div className='flex items-center justify-start gap-x-2'>
        <div className='w-1/2 md:w-1/3'>
          <Label htmlFor='date'>Date</Label>
          <div className='relative max-w-sm'>
            <input
              type='date'
              name='date'
              min={today}
              required
              className='flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300'
              placeholder='Select date'
            />
          </div>
        </div>
        <div className='w-1/2 md:w-1/3'>
          <Label htmlFor='priority'>Priority</Label>
          <Select name='priority'>
            <SelectTrigger>
              <SelectValue placeholder='Select task priority' />
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
        <Label htmlFor='comments'>Comments</Label>
        <Textarea id='comments' name='comments' />
      </div>
      <SubmitButton />
    </form>
  );
}
