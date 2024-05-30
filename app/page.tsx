import Authorized from "@/components/home/Authorized";
import Unauthorized from "@/components/home/Unauthorized";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) return <Unauthorized />;

  return <Authorized />;
}
