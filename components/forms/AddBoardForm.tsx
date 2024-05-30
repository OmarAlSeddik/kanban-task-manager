"use client";

import createBoard from "@/app/actions/create-board";
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
import { Label } from "@/components/ui/label";
import iconCross from "@/public/icon-cross.svg";
import { BoardSchema } from "@/schemas/board-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const AddBoardForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BoardSchema>>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      title: "",
      columns: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  function onSubmit(values: z.infer<typeof BoardSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      createBoard(values)
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
        <h2>Add New Board</h2>
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
                  placeholder="e.g. Building a Full-Stack App"
                  className="w-full rounded bg-gray6 p-4 text-black dark:bg-gray1 dark:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Label className="text-[0.75rem]">Board Columns</Label>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4">
                <FormField
                  control={form.control}
                  name={`columns.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          type="text"
                          id={`columns.${index}.`}
                          placeholder="e.g. Frontend"
                          className="w-full rounded bg-gray6 p-4 text-black dark:bg-gray1 dark:text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="group"
                  onClick={() => remove(index)}
                >
                  <Image
                    src={iconCross}
                    alt="Delete Task"
                    className="group-hover:white-filter transition-all"
                  />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Button type="button" onClick={() => append({ title: "" })}>
          + Add New Column
        </Button>
        <SubmitButton isPending={isPending}>Create Board</SubmitButton>
        <FormResult errorMessage={error} successMessage={success} />
      </form>
    </Form>
  );
};

export default AddBoardForm;
