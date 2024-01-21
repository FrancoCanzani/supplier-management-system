'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DataTableViewOptions } from './dataTableViewOptions';
import { DataTableFacetedFilter } from './dataTableFacetedFilter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
}

export function DataTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // @ts-ignore
  const uniqueSuppliers = [...new Set(data.map((item) => item.supplier))];
  // @ts-ignore
  const uniqueLabels = [...new Set(data.map((item) => item.label))];

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

  const supplierArray = uniqueSuppliers.map((supplier) => ({
    label: supplier,
    value: supplier,
  }));
  const labelArray = uniqueLabels.map((label) => ({
    label: label,
    value: label,
  }));

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('supplier') && (
          <DataTableFacetedFilter
            column={table.getColumn('supplier')}
            title='Supplier'
            options={supplierArray}
          />
        )}
        {table.getColumn('label') && (
          <DataTableFacetedFilter
            column={table.getColumn('label')}
            title='Label'
            options={labelArray}
          />
        )}
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
