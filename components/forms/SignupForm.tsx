"use client";

import signup from "@/app/actions/signup";
import FormResult from "@/components/FormResult";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupSchema } from "@/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import { z } from "zod";

const SignupForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    console.log(values);
    setError("");
    setSuccess("");

    startTransition(() => {
      signup(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            console.log(data.success);
            setSuccess(data.success);
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-screen w-full max-w-lg flex-col justify-center gap-6 rounded bg-white p-8 dark:bg-gray2 md:h-auto"
      >
        <h1 className="text-[1.25rem] font-bold">Signup</h1>
        <div className="relative flex flex-col gap-6 pb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-[0.75rem]">Display Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    placeholder="e.g. John Doe"
                    className="w-full rounded bg-gray6 p-4 text-black dark:bg-gray1 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.75rem]">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="email"
                    placeholder="e.g. John.Doe@example.com"
                    className="w-full rounded bg-gray6 p-4 text-black dark:bg-gray1 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.75rem]">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    id="password"
                    placeholder="e.g. John.Doe@example.com"
                    className="w-full rounded bg-gray6 p-4 text-black dark:bg-gray1 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton isPending={isPending}>Signup</SubmitButton>
          <FormResult
            errorMessage={error}
            successMessage={success}
            className="bottom-0"
          />
        </div>
        <div className="flex items-center">
          <div className="h-px flex-1 bg-gray4" />
          <p className="flex-1 text-center text-gray4">OR</p>
          <div className="h-px flex-1 bg-gray4" />
        </div>
        <div className="flex gap-4">
          <Button
            className="flex-1 border bg-gray6 hover:bg-gray6/80 dark:bg-white dark:hover:bg-white/80"
            type="button"
            onClick={() => console.log("google")}
          >
            <FcGoogle className="size-4" />
          </Button>
          <Button
            className="flex-1 bg-black hover:bg-black/80"
            type="button"
            onClick={() => console.log("github")}
          >
            <FiGithub className="size-4" />
          </Button>
          <Button
            className="flex-1 bg-[#5865F2] hover:bg-[#5865f2cc]"
            type="button"
            onClick={() => console.log("discord")}
          >
            <FaDiscord className="size-4" />
          </Button>
        </div>
        <div className="h-px w-full bg-gray4" />
        <p className="flex justify-center gap-1">
          <span>Already have an account?</span>
          <Link
            href="/auth/login"
            className="text-primary transition hover:text-primary-hover"
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;
