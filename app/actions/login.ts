"use server";

import { getUserByEmail } from "@/data/user";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "@/schemas/login-schema";
import { redirect } from "next/navigation";
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

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
};

export default login;
