import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubmitButton } from './forms/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { feedbackValidation } from '@/lib/validationSchemas';
import { toast } from 'sonner';
import { createRef } from 'react';
import { sendEmail } from '@/lib/actions';

export default function FeedbackDialog() {
  const ref = createRef<HTMLFormElement>();

  const clientAction = async (formData: FormData) => {
    const supplierData = {
      email: formData.get('email'),
      message: formData.get('message'),
    };

    // Client side validation
    const validation = feedbackValidation.safeParse(supplierData);
    if (!validation.success) {
      validation.error.issues.map((issue) => toast.error(issue.message));
    } else {
      const response = await sendEmail();

      toast.success('Feedback sent successfully!');
      if (ref.current) {
        ref.current.reset();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Feedback</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription className='text-gray-700'>
            We value your opinion! Share your feedback and let&apos;s make
            things better together.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} ref={ref} className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input
              id='email'
              className='col-span-3'
              name='email'
              type='email'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Feedback
            </Label>
            <Textarea id='message' name='message' className='col-span-3' />
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
