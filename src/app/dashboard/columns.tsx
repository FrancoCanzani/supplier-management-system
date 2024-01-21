'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { priorities, statuses } from '@/lib/data';
import { ArrowUpDown } from 'lucide-react';
import { DataTableRowActions } from '@/components/tables/data-table-row-actions';
import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';

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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-inherit'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Supplier
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={`dashboard/suppliers/${row.original.supplierId}`}
        className='capitalize max-w-[200px] truncate font-semibold hover:underline'
      >
        {row.original.supplier}
      </Link>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'label',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-inherit'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Label
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground'>
        {row.original.label}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-inherit'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className='max-w-[500px] truncate font-medium'>
        {row.getValue('title')}
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-inherit'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Deadline
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className=''>
        {new Date(row.original.date).toLocaleDateString(['ban', 'id'])}
      </span>
    ),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-inherit'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-inherit'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
