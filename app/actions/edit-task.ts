"use server";

import { db } from "@/lib/db";
import { TaskSchema } from "@/schemas/task-schema";
import { z } from "zod";

const editTask = async (
  values: z.infer<typeof TaskSchema>,
  taskId: string | undefined
) => {
  const validatedFields = TaskSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;
  const subtasks = data.subtasks;

  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: data.title,
      description: data.description,
      columnId: data.status,
    },
  });

  const updateSubtasks = async (
    taskId: string,
    updates: { id: string; title?: string }[]
  ) => {
    const updatePromises = updates.map((update) =>
      db.subtask.updateMany({
        where: {
          id: update.id,
          taskId,
        },
        data: {
          title: update.title,
        },
      })
    );

    // Execute all update promises
    await Promise.all(updatePromises);
  };

  updateSubtasks(taskId || "", subtasks);

  // revalidatePath("/", "layout");

  return { success: "Task Edited!" };
};

export default editTask;
