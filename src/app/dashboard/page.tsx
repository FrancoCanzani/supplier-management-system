import { Separator } from '@/components/ui/separator';
import dbConnect from '@/lib/database/dbConnect';
import { Task } from '@/lib/database/schemas/taskSchema';
import { TasksTable } from '@/components/tasksTable';
import { columns } from './columns';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  async function getAllTasks(userId: string) {
    const db = await dbConnect();

    try {
      const userTasks = await Task.find({ userId });
      return {
        success: true,
        data: userTasks,
      };
    } catch (error) {
      return {
        error: 'Error fetching tasks from the database',
      };
    }
  }

  if (userId) {
    const userTasksResult = await getAllTasks(userId);

    return (
      <div className='space-y-6 px-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>All Tasks</h2>
          <p className='text-gray-600'>All your past and present tasks.</p>
        </div>
        <Separator />
        <TasksTable columns={columns} data={userTasksResult.data ?? []} />
      </div>
    );
  }
}
