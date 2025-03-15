'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { authSchemaType, authType } from "types";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const form = useForm<authSchemaType>({
    resolver: zodResolver(authType),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  async function onSubmit(values: authSchemaType) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sign-in`, values);
      if (response.status !== 200) {
        toast.error("An error occurred. Please try again later.");
        return;
      }

      if (!response.data.token) {
        toast.error("No token received from server");
        return;
      }

      localStorage.setItem('token', response.data.token);

      toast.success("You have successfully signed in.");
      router.push("/opinions");
    } catch (err: any) {
      toast.error(`An error occurred: ${err.message}`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-xl font-medium mb-6">Sign in to continue</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2">
              {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to <Link href="#" className="text-red-600 hover:underline">be a good</Link> and <Link href="#" className="text-red-600 hover:underline">gentle person</Link>.
        </div>
      </div>
    </div>
  )
}
