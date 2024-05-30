import AddBoardForm from "@/components/forms/AddBoardForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import iconBoard from "@/public/icon-board.svg";
import { Board } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ boards }: { boards: Board[] | null | undefined }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4">
      <h2 className="flex justify-start px-6 text-[0.75rem] font-normal leading-[0.9375rem] tracking-[0.15rem]">
        ALL BOARDS ({boards?.length})
      </h2>
      <ul className="flex flex-col">
        {boards?.map((board) => (
          <li key={board.id}>
            <Link
              href={`/board/${board.id}`}
              className={cn(
                "w-60 rounded-r-full flex items-center gap-3 py-3.5 pl-6 transition hover:bg-gray5 dark:hover:bg-gray1",
                board.id === pathname &&
                  "bg-primary text-white hover:bg-primary-hover dark:hover:bg-primary-hover"
              )}
            >
              <Image
                src={iconBoard}
                alt="Board"
                className={cn(board.id === pathname && "white-filter")}
              />
              <span>{board.title}</span>
            </Link>
          </li>
        ))}
        <li>
          <Dialog>
            <DialogTrigger>
              <div className="group flex w-60 cursor-pointer items-center gap-3 rounded-r-full px-6 py-3.5 text-primary transition hover:bg-gray5 hover:text-primary-hover dark:hover:bg-gray1">
                <Image
                  src={iconBoard}
                  alt="Board"
                  className="primary-filter group-hover:primary-hover-filter transition-all duration-150"
                />
                <span>Create New Board</span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <AddBoardForm />
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
