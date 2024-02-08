'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Button } from '../ui/button';
import Link from 'next/link';
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
import { orderValidation } from '@/lib/validationSchemas';
import {
  updateOrderStatus,
  updateOrderPriority,
  deleteOrder,
} from '@/lib/actions';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function OrdersTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const order = orderValidation.parse(row.original);

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
          <Link
            href={`/dashboard/orders/edit/${order._id}`}
            className='cursor-default w-full text-start'
          >
            Edit
          </Link>
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
        {order.file && (
          <>
            <DropdownMenuItem>
              <a
                href={order.file.url}
                className='cursor-default w-full text-start flex items-center justify-start'
                download
              >
                Order File{' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.2em'
                  height='1.2em'
                  viewBox='0 0 24 24'
                  className='ml-2'
                >
                  <path
                    fill='currentColor'
                    d='M18.385 18h-9.77q-.69 0-1.152-.462Q7 17.075 7 16.385V3.615q0-.69.463-1.152Q7.925 2 8.615 2H15.5L20 6.5v9.885q0 .69-.462 1.152q-.463.463-1.153.463M15 7V3H8.615q-.23 0-.423.192Q8 3.385 8 3.615v12.77q0 .23.192.423q.193.192.423.192h9.77q.23 0 .423-.192q.192-.193.192-.423V7zM4.615 22q-.69 0-1.152-.462Q3 21.075 3 20.385V8h1v12.385q0 .23.192.423q.193.192.423.192H14v1zM8 3v4zv14z'
                  />
                </svg>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={order.priority}>
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  key={priority.value}
                  value={priority.value}
                  className='capitalize'
                  onClick={() =>
                    order._id &&
                    updateOrderPriority(order._id, order.id, priority.value)
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
            <DropdownMenuRadioGroup value={order.status}>
              {statuses.map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  value={status.value}
                  className='capitalize'
                  onClick={() =>
                    order._id &&
                    updateOrderStatus(order._id, order.id, status.value)
                  }
                >
                  {status.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => order._id && deleteOrder(order._id, order.id)}
          className='text-red-600 focus:text-red-500'
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
