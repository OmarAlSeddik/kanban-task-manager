"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const deleteBoard = async (boardId: string | undefined) => {
  await db.board.delete({ where: { id: boardId } });

  revalidatePath("/", "layout");
  redirect(`/`);

  return { success: "Board Deleted!" };
};

export default deleteBoard;
