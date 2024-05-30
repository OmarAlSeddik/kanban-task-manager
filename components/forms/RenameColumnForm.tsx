"use client";

import renameColumn from "@/app/actions/rename-column";
import FormResult from "@/components/FormResult";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
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
import { Column } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RenameColumnForm = ({
  column,
}: {
  column: Column | null | undefined;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RenameSchema>>({
    resolver: zodResolver(RenameSchema),
    defaultValues: {
      title: column?.title,
    },
  });

  function onSubmit(values: z.infer<typeof RenameSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      renameColumn(values, column?.id)
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
        className="flex h-screen flex-col justify-center gap-6 rounded bg-white p-8 dark:bg-gray2 md:h-auto"
      >
        <h2>Rename Column</h2>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[0.75rem]">Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="title"
                  placeholder="e.g. Full-Stack Application"
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
            Rename Column
          </SubmitButton>
          <FormResult errorMessage={error} successMessage={success} />
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="flex-1">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default RenameColumnForm;
