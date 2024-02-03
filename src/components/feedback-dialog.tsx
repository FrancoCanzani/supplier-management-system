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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { feedbackValidation } from '@/lib/validationSchemas';
import { toast } from 'sonner';
import { createRef } from 'react';
import { sendFeedback } from '@/lib/actions';
import { SubmitButton } from './forms/submit-button';

export default function FeedbackDialog() {
  const ref = createRef<HTMLFormElement>();

  const clientAction = async (formData: FormData) => {
    const feedback = {
      email: formData.get('email'),
      message: formData.get('message'),
    };

    const validation = feedbackValidation.safeParse(feedback);
    if (!validation.success) {
      validation.error.issues.map((issue) => toast.error(issue.message));
    } else {
      const response = await sendFeedback(formData);

      toast.success('Feedback sent successfully!');
      if (ref.current) {
        ref.current.reset();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='px-7 ml-3n gap-x-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.3em'
            height='1em'
            viewBox='0 0 31 24'
          >
            <path
              fill='currentColor'
              d='M12 2.182h-.105c-1.715 0-3.354.325-4.859.918l.09-.031a9.179 9.179 0 0 0-3.599 2.394l-.006.006A4.827 4.827 0 0 0 2.183 8.72v.005a4.619 4.619 0 0 0 .912 2.705l-.009-.012a7.892 7.892 0 0 0 2.5 2.229l.039.02l1.654.958l-.597 1.432q.579-.341 1.057-.665l.75-.528l.903.17c.783.15 1.684.237 2.606.24h.107c1.715 0 3.354-.325 4.859-.918l-.09.031a9.179 9.179 0 0 0 3.599-2.394l.006-.006c.827-.836 1.338-1.986 1.338-3.256s-.511-2.42-1.338-3.256a9.152 9.152 0 0 0-3.542-2.379l-.063-.021a13.04 13.04 0 0 0-4.79-.895h-.09h.005zM12 0l.151-.001c2.119 0 4.138.429 5.974 1.206l-.101-.038a10.884 10.884 0 0 1 4.358 3.161l.014.018c.996 1.174 1.602 2.706 1.602 4.38s-.606 3.207-1.61 4.39l.008-.01a10.866 10.866 0 0 1-4.299 3.152l-.073.026c-1.736.739-3.756 1.169-5.875 1.169l-.157-.001H12a17.26 17.26 0 0 1-3.106-.289l.106.016a14.174 14.174 0 0 1-4.64 2.158l-.1.022c-.389.1-.886.195-1.391.264l-.074.008h-.051a.535.535 0 0 1-.35-.136a.56.56 0 0 1-.196-.355v-.003a.333.333 0 0 1-.017-.107v-.006c0-.038.003-.076.009-.113l-.001.004a.375.375 0 0 1 .035-.104l-.001.002l.042-.086l.06-.094l.068-.086l.08-.086l.068-.08q.086-.102.392-.426t.443-.503t.383-.494c.152-.191.293-.406.415-.633l.011-.023q.179-.341.35-.75a10.034 10.034 0 0 1-3.303-2.985l-.021-.032A6.644 6.644 0 0 1-.003 8.724v-.002a6.852 6.852 0 0 1 1.609-4.391l-.009.011A10.866 10.866 0 0 1 5.896 1.19l.073-.026C7.705.425 9.725-.005 11.844-.005l.161.001h-.008zm14.01 19.925q.17.409.35.75c.133.25.274.465.433.665l-.007-.009q.247.315.383.494t.443.503q.306.32.392.426q.017.017.068.08t.08.086a.75.75 0 0 1 .066.083l.002.002a.87.87 0 0 1 .058.09l.002.004l.042.086l.034.102l.009.11l-.017.11a.634.634 0 0 1-.22.374l-.001.001a.513.513 0 0 1-.377.119h.002a13.591 13.591 0 0 1-6.243-2.482l.039.027c-.901.171-1.938.27-2.998.273h-.002a14.253 14.253 0 0 1-8.101-2.283l.056.034q.989.068 1.5.068h.067c1.855 0 3.644-.28 5.327-.801l-.128.034a15.069 15.069 0 0 0 4.544-2.229l-.044.03a11.487 11.487 0 0 0 3.24-3.563l.029-.055a8.67 8.67 0 0 0 1.142-4.327c0-.926-.143-1.818-.409-2.655l.017.062a10.181 10.181 0 0 1 3.457 3.004l.02.029a6.598 6.598 0 0 1 1.278 3.921a6.62 6.62 0 0 1-1.224 3.846l.014-.021a10.069 10.069 0 0 1-3.275 2.983l-.05.026z'
            />
          </svg>
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] rounded-md'>
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
