import { Separator } from '@/components/ui/separator';
import dbConnect from '@/lib/database/dbConnect';
import { Task } from '@/lib/database/schemas/taskSchema';
import { TasksTable } from '@/components/tasksTable';
import { columns } from './columns';

export default async function Dashboard() {
  async function getAllTasks() {
    const db = await dbConnect();

    try {
      const suppliers = await Task.find({});
      return {
        success: true,
        data: suppliers,
      };
    } catch (error) {
      return {
        error: 'Error fetching tasks from the database',
      };
    }
  }
  const result = await getAllTasks();

  return (
    <div className='space-y-6 p-10 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>All Tasks</h2>
        <p className='text-gray-600'>All your past and present tasks.</p>
      </div>
      <Separator />
      <TasksTable columns={columns} data={result.data ?? []} />
    </div>
  );
}
