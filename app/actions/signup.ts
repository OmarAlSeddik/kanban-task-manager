"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { SignupSchema } from "@/schemas/signup-schema";
import { z } from "zod";

const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const data = validatedFields.data;
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  await db.user.create({
    data: {
      id: authData?.user?.id,
      name: data.name,
      email: data.email,
    },
  });

  return { success: "A link has been sent to your email!" };
};

export default signup;
