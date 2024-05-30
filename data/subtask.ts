import { db } from "@/lib/db";

export const getSubtasksByTaskId = async (taskId: string) => {
  try {
    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { subtasks: true },
    });
    return task?.subtasks;
  } catch {
    return null;
  }
};
