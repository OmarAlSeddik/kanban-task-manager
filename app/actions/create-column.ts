"use server";

import { db } from "@/lib/db";
import { ColumnSchema } from "@/schemas/column-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createColumn = async (
  values: z.infer<typeof ColumnSchema>,
  boardId: string
) => {
  const validatedFields = ColumnSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;

  await db.column.create({
    data: {
      title: data.title,
      boardId,
    },
  });

  revalidatePath("/", "layout");

  return { success: "Column created!" };
};

export default createColumn;
