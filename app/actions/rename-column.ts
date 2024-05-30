"use server";

import { db } from "@/lib/db";
import { RenameSchema } from "@/schemas/rename-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const renameColumn = async (
  values: z.infer<typeof RenameSchema>,
  columnId: string | undefined
) => {
  const validatedFields = RenameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  if (!columnId) {
    return { error: "Column not found!" };
  }

  const data = validatedFields.data;

  await db.column.update({
    where: {
      id: columnId,
    },
    data: {
      title: data.title,
    },
  });

  revalidatePath("/", "layout");

  return { success: "Column Renamed!" };
};

export default renameColumn;
