import { db } from "@/lib/db";

export const getBoardsByUserId = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { boards: true },
    });
    return user?.boards;
  } catch {
    return null;
  }
};

export const getBoardById = async (id: string) => {
  try {
    const board = await db.board.findUnique({
      where: { id },
    });
    return board;
  } catch {
    return null;
  }
};
