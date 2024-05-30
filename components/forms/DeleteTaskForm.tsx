import deleteTask from "@/app/actions/delete-task";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Task } from "@prisma/client";

const DeleteTaskForm = ({ task }: { task: Task | null | undefined }) => {
  return (
    <div className="flex h-screen flex-col justify-center gap-6 rounded bg-white p-8 dark:bg-gray2 md:h-auto">
      <h2 className="text-[1.125rem] text-destructive">Delete this task?</h2>
      <p className="text-[0.8125rem] text-gray4">
        Are you sure you want to delete the{" "}
        <span className="font-bold text-destructive">
          &quot;{task?.title}&quot;
        </span>{" "}
        task and its subtasks? This action cannot be reversed.
      </p>
      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => deleteTask(task?.id)}
        >
          Delete
        </Button>
        <DialogClose asChild>
          <Button variant="secondary" className="flex-1">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default DeleteTaskForm;
