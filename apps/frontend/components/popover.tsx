import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Share2Icon } from 'lucide-react';

export function DialogThing() {
  return (
    <Dialog>
      <DialogTrigger className='bg-red-500 text-white rounded-sm font-semibold shadow-xs hover:bg-red-600 focus-visible:ring-red-200 dark:focus-visible:ring-red-400 dark:bg-red-700 px-4 py-2 cursor-pointer'>
        Give your Opinion
      </DialogTrigger>
      <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
        <DialogHeader>
          <DialogTitle className='text-zinc-900 dark:text-white'>
            Submit an Opinion
          </DialogTitle>
          <DialogDescription className='text-zinc-600 dark:text-zinc-400'>
            Share your thoughts about something you care about.
          </DialogDescription>
        </DialogHeader>
        <div className='mt-6 flex flex-col space-y-4'>
          <Textarea placeholder='Your opinion' className='w-full' />
          <Button>
            <Share2Icon />Share
          </Button>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
