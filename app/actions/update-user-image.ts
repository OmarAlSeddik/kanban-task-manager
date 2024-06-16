"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const updateUserImage = async (userId: string, image: string) => {
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

export default updateUserImage;
