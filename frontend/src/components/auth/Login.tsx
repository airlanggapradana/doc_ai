"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { login, setCookie } from "@/actions/helperFunctions";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await login(data);

    if (res.status === 200) {
      await setCookie(res.data.result.token);
      form.reset();
      router.push("/dashboard");
      return (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>User Login Success</AlertTitle>
          <AlertDescription>You may now enjoy our features.</AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-6 gap-6"
      >
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="masukkan email valid anda..."
                  />
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
                    {...field}
                    type="password"
                    placeholder="masukkan password anda..."
                  />
                </FormControl>
                <FormDescription>Password minimal 8 karakter.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6 justify-between sm:flex sm:items-center sm:gap-4">
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Belum punya akun?
            <a href="/register" className="text-sky-500 underline">
              register
            </a>
            .
          </p>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="rounded-md border border-indigo-600 bg-indigo-600 px-12 py-6 text-sm font-semibold text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Login;
