"use client";

import renameUser from "@/app/actions/rename-user";
import FormResult from "@/components/FormResult";
import SubmitButton from "@/components/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RenameSchema } from "@/schemas/rename-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const RenameUserForm = ({ user }: { user: User | null | undefined }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RenameSchema>>({
    resolver: zodResolver(RenameSchema),
    defaultValues: {
      title: user?.name || "",
    },
  });

  function onSubmit(values: z.infer<typeof RenameSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      renameUser(values, user?.id)
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
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[0.75rem]">Display Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="title"
                  placeholder="e.g. John Doe"
                  className="w-full rounded bg-gray6 p-4 text-black dark:bg-gray1 dark:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <SubmitButton isPending={isPending} className="flex-1">
            Change Name
          </SubmitButton>
          <Button type="button" variant="destructive" className="flex-1">
            Close
          </Button>
        </div>
        <FormResult errorMessage={error} successMessage={success} />
      </form>
    </Form>
  );
};

export default RenameUserForm;
