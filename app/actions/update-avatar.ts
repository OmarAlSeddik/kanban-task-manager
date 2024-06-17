"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const updateAvatar = async (userId: string, image: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      image,
    },
  });

  revalidatePath("/", "layout");

  return { success: "Image Uploaded!" };
};

export default updateAvatar;
