import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const BoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
};

export default BoardLayout;
