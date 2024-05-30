"use client";

import { Column, Subtask, Task } from "@prisma/client";
import { useState } from "react";
import ViewTaskForm from "../../forms/ViewTaskForm";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

const TaskDialog = ({
  task,
  columns,
  subtasks,
  completedSubtasks,
  subtaskCount,
}: {
  task: Task | undefined;
  columns: Column[] | undefined;
  subtasks: Subtask[] | null | undefined;
  completedSubtasks: number | undefined;
  subtaskCount: number | undefined;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer flex-col gap-2 rounded bg-white px-4 py-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray2">
          <span>{task?.title}</span>
          <span className="text-gray4">
            {completedSubtasks} of {subtaskCount} subtasks
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <ViewTaskForm
          task={task}
          columns={columns}
          subtasks={subtasks}
          completedSubtasks={completedSubtasks}
          subtaskCount={subtaskCount}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
