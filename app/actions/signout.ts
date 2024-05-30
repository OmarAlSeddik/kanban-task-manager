"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const signOut = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }

  redirect("/auth/login");
};

export default signOut;
