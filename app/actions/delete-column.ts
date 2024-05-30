"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteColumn = async (columnId: string | undefined) => {
  await db.column.delete({ where: { id: columnId } });

  revalidatePath("/", "layout");

  return { success: "Column Deleted!" };
};

export default deleteColumn;
