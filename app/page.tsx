import Authorized from "@/components/home/Authorized";
import Unauthorized from "@/components/home/Unauthorized";

export default async function Home() {
  const user = null;

  if (!user) return <Unauthorized />;

  return <Authorized />;
}
