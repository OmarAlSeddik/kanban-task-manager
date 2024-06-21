import { db } from "@/lib/db";
import ExtendedUser from "@/lib/types/ExtendedUser";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string): Promise<ExtendedUser | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: { avatar: true, boards: true },
    });
    return user as ExtendedUser;
  } catch {
    return null;
  }
};
