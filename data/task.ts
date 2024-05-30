import { db } from "@/lib/db";

export const getTasksByColumnId = async (columnId: string) => {
  try {
    const column = await db.column.findUnique({
      where: { id: columnId },
      include: { tasks: true },
    });
    return column?.tasks;
  } catch {
    return null;
  }
};
