"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { register } from "@/actions/helperFunctions";
import { Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerFormSchema } from "@/lib/form.schema";

const Register = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerFormSchema>> = async (
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await register(data);

    if (res.status === 201) {
      form.reset();
      router.push("/login");
      return (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>User Registration Success</AlertTitle>
          <AlertDescription>
            You may now login to your account.
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-6 gap-7"
      >
        <div className="col-span-6 sm:col-span-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="masukkan nama anda..." {...field} />
                </FormControl>
                <FormDescription>
                  Nama lengkap anda minimal 3 karakter
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="masukkan email anda..." {...field} />
                </FormControl>
                <FormDescription>Email valid Anda.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="masukkan password anda..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Password minimal 8 karakter.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            Dengan membuat akun, Anda setuju dengan
            <a href="#" className="text-gray-700 underline">
              {" "}
              terms and conditions{" "}
            </a>
            and{" "}
            <a href="#" className="text-gray-700 underline">
              privacy policy
            </a>
            .
          </p>
        </div>

        <div className="col-span-6 justify-between sm:flex sm:items-center sm:gap-4">
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Sudah punya akun?
            <Link href="/login" className="text-sky-700 underline">
              Log in
            </Link>
            .
          </p>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="rounded-md border border-indigo-600 bg-indigo-500 px-12 py-6 text-sm font-semibold text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Create an account
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Register;
