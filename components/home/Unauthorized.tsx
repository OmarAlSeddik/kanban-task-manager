import { Button } from "@/components/ui/button";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <main className="container flex h-full items-center justify-center gap-4 p-0">
      <div className="flex h-screen w-full max-w-lg flex-col justify-center gap-2 rounded bg-white p-8 text-center dark:bg-gray2 md:h-auto">
        <h2 className="text-[1.125rem] font-bold">Welcome to Our</h2>
        <h1 className="text-[1.5rem] font-bold">Kanban Task Manager App!</h1>
        <p>To start using the application, you will have to login.</p>
        <Button asChild>
          <Link href="/auth/login" className="mt-4">
            Head to the Login Page
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default Unauthorized;
