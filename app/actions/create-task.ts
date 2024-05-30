"use server";

import { db } from "@/lib/db";
import { TaskSchema } from "@/schemas/task-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTask = async (values: z.infer<typeof TaskSchema>) => {
  const validatedFields = TaskSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;
  const subtasks = data.subtasks;

  const task = await db.task.create({
    data: {
      title: data.title,
      description: data.description,
      columnId: data.status,
    },
  });

  await db.subtask.createMany({
    data: subtasks.map((subtask) => ({
      title: subtask.title,
      taskId: task.id,
    })),
  });

  revalidatePath("/", "layout");

  return { success: "Task created!" };
};

export default createTask;
