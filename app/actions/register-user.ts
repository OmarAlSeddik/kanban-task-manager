"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/register-schema";
import { z } from "zod";

const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // TODO: handle auth here

  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });

  return { success: "Registered Successfully!" };
};

export default registerUser;
