"use server";

import { db } from "@/lib/db";
import { RenameSchema } from "@/schemas/rename-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const renameBoard = async (
  values: z.infer<typeof RenameSchema>,
  boardId: string | undefined
) => {
  const validatedFields = RenameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;

  await db.board.update({
    where: {
      id: boardId,
    },
    data: {
      title: data.title,
    },
  });

  revalidatePath("/", "layout");

  return { success: "Board Renamed!" };
};

export default renameBoard;
