import { useFormStatus, useFormState } from 'react-dom';
import { deleteSupplier } from '@/lib/actions';
import { AlertTriangle } from 'lucide-react';

const initialState = {
  message: '',
};

export function DeleteForm({ id, name }: { id: string; name: string }) {
  const [state, formAction] = useFormState(deleteSupplier, initialState);

  return (
    <form action={formAction}>
      <input type='hidden' name='id' value={id} />
      <input type='hidden' name='todo' value={name} />
      <DeleteButton />
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.message}
      </p>
    </form>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='flex items-center justify-start gap-x-2'
      aria-disabled={pending}
    >
      Delete <AlertTriangle size={16} />
    </button>
  );
}
