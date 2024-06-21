"use server";

import { db } from "@/lib/db";
import { RenameSchema } from "@/schemas/rename-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const renameUser = async (
  values: z.infer<typeof RenameSchema>,
  userId: string | undefined
) => {
  const validatedFields = RenameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  if (!userId) {
    return { error: "User not found!" };
  }

  const data = validatedFields.data;

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.title,
    },
  });

  revalidatePath("/", "layout");

  return { success: "User Renamed!" };
};

export default renameUser;
