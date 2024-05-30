import { getUserById } from "@/data/user";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = await getUserById(data.user?.id || "");

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
};

export default AdminLayout;
