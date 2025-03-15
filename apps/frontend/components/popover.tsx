'use client'

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
import { Loader2Icon, Share2Icon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const opinionSchema = z.object({
  opinion: z.string().min(10, "Opinion must be at least 10 characters long").max(500, "Opinion must be less than 500 characters")
});

type OpinionFormValues = z.infer<typeof opinionSchema>;

export function DialogThing() {
  const form = useForm<OpinionFormValues>({
    resolver: zodResolver(opinionSchema),
    defaultValues: {
      opinion: "",
    },
  });

  async function onSubmit(values: OpinionFormValues) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/create`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status !== 201) {
        toast.error('Failed to submit your opinion. Please try again later.');
        return;
      }

      toast.success('Your opinion has been submitted successfully.');
      form.reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6 flex flex-col space-y-4'>
            <FormField
              control={form.control}
              name="opinion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your opinion"
                      className="w-full resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              <Share2Icon className="mr-2 h-4 w-4" />
              {form.formState.isSubmitting ? <Loader2Icon className="animate-spin" /> : 'Share'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
