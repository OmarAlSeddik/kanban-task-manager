"use server";

import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { BoardSchema } from "@/schemas/board-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createBoard = async (values: z.infer<typeof BoardSchema>) => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

  const validatedFields = BoardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;
  const columns = data.columns;

  const board = await db.board.create({
    data: {
      title: data.title,
      users: {
        connect: [{ id: userData.user?.id }],
      },
    },
  });

  await db.column.createMany({
    data: columns.map((column) => ({
      title: column.title,
      boardId: board.id,
    })),
  });

  revalidatePath("/", "layout");

  return { success: "Board created!" };
};

export default createBoard;
