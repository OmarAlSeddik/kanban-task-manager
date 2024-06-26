"use client";

import createTask from "@/app/actions/create-task";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import iconCross from "@/public/icon-cross.svg";
import { TaskSchema } from "@/schemas/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column } from "@prisma/client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const AddTaskForm = ({
  boardId,
  columns,
  setOpen,
}: {
  boardId: string;
  columns: Column[] | null | undefined;
  setOpen: (state: boolean) => void;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      subtasks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  function onSubmit(values: z.infer<typeof TaskSchema>) {
    setError("");

    startTransition(() => {
      createTask(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else setOpen(false);
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
        <h2>Add New Task</h2>
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
                  placeholder="e.g. Setup the Project"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[0.75rem]">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="e.g. We will setup the full-stack project."
                  className="w-full rounded bg-gray6 p-4 text-black dark:bg-gray1 dark:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Label className="text-[0.75rem]">Subtasks</Label>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4">
                <FormField
                  control={form.control}
                  name={`subtasks.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          type="text"
                          id={`columns.${index}`}
                          placeholder="e.g. Install the Required Dependencies"
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
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ id: "", title: "" })}
        >
          + Add New Subtask
        </Button>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {columns?.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <SubmitButton isPending={isPending} className="flex-1">
            Create Task
          </SubmitButton>
          <FormResult errorMessage={error} />
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default AddTaskForm;
