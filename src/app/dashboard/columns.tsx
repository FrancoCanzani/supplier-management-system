'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { priorities, statuses } from '@/lib/data';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { TasksTableRowActions } from '@/components/tables/tasks-table-row-actions';
import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'pin',
    header: () => 'Pin',
    cell: ({ row }) =>
      row.getIsPinned() ? (
        <Button
          onClick={() => row.pin(false)}
          variant='ghost'
          className='p-0 hover:bg-inherit'
        >
          <DrawingPinFilledIcon />
        </Button>
      ) : (
        <Button
          onClick={() => row.pin('top')}
          variant='ghost'
          className='p-0 hover:bg-inherit'
        >
          <DrawingPinIcon />
        </Button>
      ),
  },
  {
    accessorKey: 'supplier',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Supplier' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <Link
            href={`dashboard/suppliers/${row.original.supplierId}`}
            className='capitalize max-w-[200px] truncate font-semibold hover:underline'
          >
            {row.original.supplier}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Task' />
    ),
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <Badge variant='outline'>{row.original.label}</Badge>
        <span className='max-w-[500px] truncate font-medium'>
          {row.getValue('title')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => (
      <span className=''>
        {new Date(row.original.date).toLocaleDateString(['ban', 'id'])}
      </span>
    ),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      );

      if (!priority) {
        return null;
      }

      return (
        <div className='flex items-center capitalize'>
          {priority.icon && (
            <priority.icon className='mr-2 h-4 w-4 text-muted-foreground capitalize' />
          )}
          <span>{priority.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }
      return (
        <div className='flex items-center capitalize'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground capitalize' />
          )}
          <span>{status.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <TasksTableRowActions row={row} />,
  },
];
