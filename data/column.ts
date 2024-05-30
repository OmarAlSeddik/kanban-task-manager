import { db } from "@/lib/db";

export const getColumnsByBoardId = async (boardId: string) => {
  try {
    const board = await db.board.findUnique({
      where: { id: boardId },
      include: { columns: true },
    });
    return board?.columns;
  } catch {
    return null;
  }
};
