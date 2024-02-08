'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { OrderData } from '@/lib/types';
import { statuses, priorities } from '@/lib/data';
import { OrdersTableRowActions } from '@/components/tables/orders-table-row-actions';

export const columns: ColumnDef<OrderData>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='PO#' />
    ),
    cell: ({ row }) => <div className='capitalize'>{row.original.id}</div>,
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
            href={`/dashboard/suppliers/${row.original.supplierId}`}
            className='capitalize max-w-[200px] truncate font-semibold hover:underline'
          >
            {row.original.supplier}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'label',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Label' />
    ),
    cell: ({ row }) => <div className='capitalize'>{row.original.label}</div>,
  },
  {
    accessorKey: 'crd',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CRD' />
    ),
    cell: ({ row }) => (
      <div className='capitalize'>
        {' '}
        {row.original.crd
          ? new Date(row.original.crd).toLocaleDateString(['ban', 'id'])
          : ''}
      </div>
    ),

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'incoterm',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Incoterm' />
    ),
    cell: ({ row }) => (
      <div className='capitalize'>{row.original.incoterm}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    cell: ({ row }) => <OrdersTableRowActions row={row} />,
  },
];
