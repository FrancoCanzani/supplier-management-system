'use client';

import { Separator } from '@radix-ui/react-select';
import { Input } from './ui/input';
import { useState } from 'react';
import { Supplier } from '@/lib/types';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

export function SuppliersTable({ data }: { data: Supplier[] | undefined }) {
  const [filter, setFilter] = useState('');

  const allSuppliers = data;

  if (allSuppliers == undefined) {
    return (
      <div className='w-full text-center py-6'>
        No suppliers found.{' '}
        <Link
          href={'/dashboard/suppliers/new'}
          className='underline font-medium'
        >
          Add one.
        </Link>
      </div>
    );
  }

  const regex = new RegExp(filter, 'i');

  const matchingSuppliers = allSuppliers.filter((supplier: Supplier) =>
    regex.test(supplier.name)
  );

  return (
    <div>
      <Input
        placeholder='Filter suppliers...'
        className='max-w-2xl'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Separator />
      <Table className='mt-4'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[150px]'>Account ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Port</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchingSuppliers.map((supplier) => (
            <TableRow key={supplier._id}>
              <TableCell className='font-medium'>{supplier.account}</TableCell>
              <TableCell className='capitalize font-semibold'>
                {/* todo: make a link to a new page to see supplier data */}
                {supplier.name}
              </TableCell>
              <TableCell className='capitalize'>{supplier.country}</TableCell>
              <TableCell className='capitalize'>{supplier.port}</TableCell>
              <TableCell className='capitalize'>
                <Button variant={'secondary'} size={'sm'}>
                  Edit
                </Button>
              </TableCell>
              <TableCell className='capitalize'>
                <Button variant={'destructive'} size={'sm'}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
