"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteTask = async (taskId: string | undefined) => {
  await db.task.delete({ where: { id: taskId } });

  revalidatePath("/", "layout");

  return { success: "Task Deleted!" };
};

export default deleteTask;
