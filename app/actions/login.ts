"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas/login-schema";
import { z } from "zod";

const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields." };
  }

  const data = validatedFields.data;

  const existingUser = await getUserByEmail(data.email);

  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist." };
  }

  // TODO: handle auth here
};

export default login;
