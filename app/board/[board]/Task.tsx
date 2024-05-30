import ViewTaskForm from "@/components/forms/ViewTaskForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Task = ({ task }: { task: any }) => {
  const completedSubtasks = task.subtasks.filter(
    (subtask: any) => subtask.isCompleted
  ).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer flex-col gap-2 rounded bg-white px-4 py-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray2">
          <span>{task.title}</span>
          <span className="text-gray4">
            {completedSubtasks} of {task.subtasks.length} subtasks
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <ViewTaskForm task={task} />
      </DialogContent>
    </Dialog>
  );
};

export default Task;
