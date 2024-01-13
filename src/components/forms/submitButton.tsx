'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' aria-disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </Button>
  );
}
