'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './data-Table-View-Options';
import { DataTableFacetedFilter } from './data-Table-Faceted-Filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
}

export function TasksTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const statuses = [
    {
      value: 'open',
      label: 'Open',
    },
    {
      value: 'ongoing',
      label: 'Ongoing',
    },
    {
      value: 'closed',
      label: 'Closed',
    },
    {
      value: 'canceled',
      label: 'Canceled',
    },
  ];

  const priorities = [
    {
      value: 'high',
      label: 'High',
    },
    {
      value: 'medium',
      label: 'Medium',
    },
    {
      value: 'low',
      label: 'Low',
    },
  ];

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter suppliers...'
          value={
            (table.getColumn('supplier')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('supplier')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px] focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px] focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title='Priority'
            options={priorities}
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
