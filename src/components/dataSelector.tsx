'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Supplier } from '@/lib/types';

interface ComboboxProps {
  data: Supplier[];
  placeholder: string;
  onSelect: (selectedSupplier: { name: string; id: string }) => void;
}

export function DataSelector({ data, placeholder, onSelect }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[400px] px-2 overflow-hidden text-clip justify-start capitalize'
        >
          <ChevronsUpDown className='mx-1 h-4 w-4 shrink-0 opacity-50' />
          {value.length ? value : 'Select supplier...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0'>
        <Command>
          <CommandInput placeholder='Search supplier...' />
          <CommandEmpty>No supplier found.</CommandEmpty>
          <CommandGroup>
            {data.map((supplier) => (
              <CommandItem
                key={supplier._id}
                value={supplier.name}
                onSelect={() => {
                  const selectedSupplier = {
                    name: supplier.name,
                    id: supplier.id,
                  };
                  setValue(supplier.name);
                  setOpen(false);
                  onSelect(selectedSupplier);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === supplier.name ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {supplier.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
