"use server";

import { db } from "@/lib/db";
import { ViewSchema } from "@/schemas/view-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editView = async (
  values: z.infer<typeof ViewSchema>,
  taskId: string | undefined
) => {
  const validatedFields = ViewSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;

  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      columnId: data.status,
    },
  });

  const updateSubtasks = async (
    taskId: string,
    updates: { id: string; isCompleted?: boolean }[]
  ) => {
    const updatePromises = updates.map((update) =>
      db.subtask.updateMany({
        where: {
          id: update.id,
          taskId,
        },
        data: {
          isCompleted: update.isCompleted,
        },
      })
    );

    // Execute all update promises
    await Promise.all(updatePromises);
  };

  updateSubtasks(taskId || "", data.subtasks);

  revalidatePath("/", "layout");

  return { success: "Task Edited!" };
};

export default editView;
