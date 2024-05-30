"use client";

import editView from "@/app/actions/edit-view";
import FormResult from "@/components/FormResult";
import SubmitButton from "@/components/SubmitButton";
import DeleteTaskForm from "@/components/forms/DeleteTaskForm";
import EditTaskForm from "@/components/forms/EditTaskForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewSchema } from "@/schemas/view-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column, Subtask, Task } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";

const ViewTaskForm = ({
  task,
  columns,
  subtasks,
  completedSubtasks,
  subtaskCount,
  setOpen,
}: {
  task: Task | undefined;
  columns: Column[] | undefined;
  subtasks: Subtask[] | null | undefined;
  completedSubtasks: number | undefined;
  subtaskCount: number | undefined;
  setOpen: (state: boolean) => void;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ViewSchema>>({
    resolver: zodResolver(ViewSchema),
    defaultValues: {
      status: task?.columnId || "",
      subtasks: subtasks?.map((subtask) => ({
        id: subtask.id,
        isCompleted: subtask.isCompleted,
        title: subtask.title,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  function onSubmit(values: z.infer<typeof ViewSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      editView(values, task?.id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            setSuccess(data.success);
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
        });

      setOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex h-screen flex-col justify-center gap-6 rounded bg-white p-8 dark:bg-gray2 md:h-auto"
      >
        <h2 className="text-[1.125rem] text-black dark:text-white">
          {task?.title}
        </h2>
        <p className="text-gray4">{task?.description}</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-gray4">
              Subtasks ({completedSubtasks} of {subtaskCount})
            </p>
            <Dialog>
              <DialogTrigger>
                <Button type="button" variant="ghost" className="group">
                  <Pencil className="gray-filter transition-all duration-75 group-hover:filter-none" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <EditTaskForm
                  task={task}
                  columns={columns}
                  subtasks={subtasks}
                  setOpen={setOpen}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-2">
            {fields.map((subtask, index) => (
              <FormField
                key={subtask.id}
                name={`subtasks.${index}.isCompleted`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="group flex items-center gap-4 rounded bg-gray6 p-4 transition hover:bg-primary hover:text-white dark:bg-gray1 dark:hover:bg-primary">
                      <FormControl>
                        <Checkbox
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                          className="group-hover:border-white"
                        />
                      </FormControl>
                      <p>{subtask.title}</p>
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
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
                    <SelectItem key={column?.id} value={column?.id}>
                      {column?.title}
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
            Save Changes
          </SubmitButton>
          <FormResult errorMessage={error} successMessage={success} />
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="destructive" className="flex-1">
                Delete Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DeleteTaskForm task={task} />
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
};

export default ViewTaskForm;
