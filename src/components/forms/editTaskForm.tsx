import { DialogContent } from '@/components/ui/dialog';
import { SubmitButton } from './submitButton';
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
import { taskValidation } from '@/lib/validationSchemas';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { updateTask } from '@/lib/actions';

type Task = z.infer<typeof taskValidation>;

export default function EditTaskForm({ task }: { task: Task }) {
  const [taskData, setTaskData] = useState({
    _id: task._id,
    supplier: task.supplier,
    title: task.title,
    label: task.label,
    date: task.date,
    priority: task.priority,
    comments: task.comments,
  });

  const today = new Date().toISOString().split('T')[0];
  const { userId } = useAuth();

  const clientAction = async (formData: FormData) => {
    // Client side validation
    const validation = taskValidation.safeParse(taskData);
    if (!validation.success) {
      validation.error.issues.map((issue) => toast.error(issue.message));
    } else {
      if (userId) {
        const response = await updateTask(taskData, userId);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('Task saved successfully!');
        }
      }
    }
  };

  return (
    <DialogContent>
      <form action={clientAction} className='space-y-4 w-full'>
        <div className='w-full'>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            name='title'
            minLength={3}
            placeholder='Advance container cargo ready date'
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
          />
        </div>
        <div className='w-full'>
          <Label htmlFor='label'>Label</Label>
          <Input
            id='label'
            name='label'
            required
            placeholder='Documentation'
            value={taskData.label}
            onChange={(e) =>
              setTaskData({ ...taskData, label: e.target.value })
            }
          />
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
                value={
                  taskData.date instanceof Date
                    ? taskData.date.toISOString().split('T')[0]
                    : taskData.date
                }
                onChange={(e) =>
                  setTaskData({ ...taskData, date: e.target.value })
                }
              />
            </div>
          </div>
          <div className='w-1/2 md:w-1/3'>
            <Label htmlFor='priority'>Priority</Label>
            <Select
              name='priority'
              value={taskData.priority}
              onValueChange={(e) => setTaskData({ ...taskData, priority: e })}
            >
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
          <Textarea
            id='comments'
            name='comments'
            value={taskData.comments}
            onChange={(e) =>
              setTaskData({ ...taskData, comments: e.target.value })
            }
          />
        </div>
        <SubmitButton />
      </form>
    </DialogContent>
  );
}
