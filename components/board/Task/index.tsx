import { getSubtasksByTaskId } from "@/data/subtask";
import { Column, Task as TaskType } from "@prisma/client";
import TaskDialog from "./TaskDialog";

const Task = async ({
  task,
  columns,
}: {
  task: TaskType | undefined;
  columns: Column[] | undefined;
}) => {
  const subtasks = await getSubtasksByTaskId(task?.id as string);
  const completedSubtasks = subtasks?.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const subtaskCount = subtasks?.length;

  return (
    <TaskDialog
      task={task}
      columns={columns}
      subtasks={subtasks}
      completedSubtasks={completedSubtasks}
      subtaskCount={subtaskCount}
    />
  );
};

export default Task;
