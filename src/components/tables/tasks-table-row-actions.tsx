'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { priorities, statuses } from '@/lib/data';
import { taskSchema } from '@/lib/validationSchemas';
import {
  updateTaskStatus,
  updateTaskPriority,
  deleteTask,
} from '@/lib/actions';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function TasksTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        {row.getIsPinned() ? (
          <DropdownMenuItem onClick={() => row.pin(false)}>
            Unpin
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => row.pin('top')}>
            Pin
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.priority}>
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  key={priority.value}
                  value={priority.value}
                  className='capitalize'
                  onClick={() =>
                    task._id && updateTaskPriority(task._id, priority.value)
                  }
                >
                  {priority.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.status}>
              {statuses.map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  value={status.value}
                  className='capitalize'
                  onClick={() =>
                    task._id && updateTaskStatus(task._id, status.value)
                  }
                >
                  {status.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => task._id && deleteTask(task._id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
