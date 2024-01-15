import { cn } from '@/lib/utils';
import { useFormStatus, useFormState } from 'react-dom';

const initialState = {
  message: '',
};

export function ClickAction({
  id,
  name,
  action,
  buttonText,
}: {
  id: string;
  name: string;
  action: (
    prevState: { message: string },
    formData: FormData
  ) => Promise<{ message: string }>;
  buttonText: string;
}) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction}>
      <input type='hidden' name='id' value={id} />
      <input type='hidden' name='todo' value={name} />
      <ActionButton buttonText={buttonText} />
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.message}
      </p>
    </form>
  );
}

function ActionButton({ buttonText }: { buttonText: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={cn('capitalize', pending && 'cursor-not-allowed')}
      aria-disabled={pending}
    >
      {buttonText}
    </button>
  );
}
