'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Supplier } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { SuppliersTableRowActions } from '@/components/tables/suppliers-table-row-actions';

export const columns: ColumnDef<Supplier>[] = [
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
    accessorKey: 'account',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account Id' />
    ),
    cell: ({ row }) => <div className='capitalize'>{row.original.account}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <Link
        href={`/dashboard/suppliers/${row.original.id}`}
        className='capitalize font-semibold hover:underline max-w-[500px]'
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Country' />
    ),
    cell: ({ row }) => <div className='capitalize'>{row.original.country}</div>,
  },
  {
    accessorKey: 'port',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Port' />
    ),
    cell: ({ row }) => <div className='capitalize'>{row.original.port}</div>,
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
      return (
        <div className='flex items-center capitalize'>
          {row.original.active}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <SuppliersTableRowActions row={row} />,
  },
];
