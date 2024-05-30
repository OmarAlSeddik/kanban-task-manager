import ViewTaskForm from "@/components/forms/ViewTaskForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getSubtasksByTaskId } from "@/data/subtask";
import { Task } from "@prisma/client";

const TaskComponent = async ({ task }: { task: Task }) => {
  const subtasks = await getSubtasksByTaskId(task.id);
  const completedSubtasks = subtasks?.filter((subtask) => subtask.isComplete);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer flex-col gap-2 rounded bg-white px-4 py-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray2">
          <span>{task.title}</span>
          <span className="text-gray4">
            {completedSubtasks?.length} of {subtasks?.length} subtasks
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <ViewTaskForm task={task} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskComponent;
