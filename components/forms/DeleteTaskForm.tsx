import deleteTask from "@/app/actions/delete-task";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Task } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";

const DeleteTaskForm = ({ task }: { task: Task | null | undefined }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm();

  function onSubmit() {
    startTransition(() => {
      deleteTask(task?.id);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-screen flex-col justify-center gap-6 rounded bg-white p-8 dark:bg-gray2 md:h-auto"
      >
        <h2 className="text-[1.125rem] text-destructive">Delete this task?</h2>
        <p className="text-[0.8125rem] text-gray4">
          Are you sure you want to delete the{" "}
          <span className="font-bold text-destructive">
            &quot;{task?.title}&quot;
          </span>{" "}
          task and its subtasks? This action cannot be reversed.
        </p>
        <div className="flex gap-4">
          <SubmitButton
            variant="destructive"
            className="flex-1"
            isPending={isPending}
          >
            Delete
          </SubmitButton>
          <DialogClose asChild>
            <Button variant="secondary" className="flex-1" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default DeleteTaskForm;
