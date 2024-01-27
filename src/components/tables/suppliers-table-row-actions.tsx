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
import { supplierValidation } from '@/lib/validationSchemas';
import { updateSupplierStatus, deleteSupplier } from '@/lib/actions';
import Link from 'next/link';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function SuppliersTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const supplier = supplierValidation.parse(row.original);

  const statuses = ['active', 'inactive'];

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
        <DropdownMenuItem>
          <Link href={`/dashboard/suppliers/${supplier.id}`}>Edit</Link>
        </DropdownMenuItem>
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
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={supplier.status}>
              {statuses.map((status) => (
                <DropdownMenuRadioItem
                  key={status}
                  value={status}
                  className='capitalize'
                  onClick={() =>
                    supplier._id &&
                    updateSupplierStatus(
                      supplier._id,
                      supplier.status == 'active' ? 'inactive' : 'active'
                    )
                  }
                >
                  {status}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => supplier._id && deleteSupplier(supplier._id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
