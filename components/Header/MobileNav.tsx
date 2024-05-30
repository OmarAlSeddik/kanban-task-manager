"use client";

import signOut from "@/app/actions/signout";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import iconBoard from "@/public/icon-board.svg";
import iconChevronDown from "@/public/icon-chevron-down.svg";
import { Board } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = ({
  title,
  boards,
}: {
  title: string | undefined;
  boards: Board[] | null | undefined;
}) => {
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 md:hidden">
        <h1 className="text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem]">
          {title}
        </h1>
        <Image src={iconChevronDown} alt="Chevron" />
      </DialogTrigger>
      <DialogContent className="w-[16.5rem] rounded bg-white px-0 py-4 text-gray4 dark:bg-gray2">
        <DialogHeader>
          <DialogTitle className="flex justify-start px-6 text-[0.75rem] font-normal leading-[0.9375rem] tracking-[0.15rem]">
            ALL BOARDS ({boards?.length})
          </DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col">
          {boards?.map((board) => (
            <li
              key={board.title}
              className={cn(
                "w-60 rounded-r-full py-3.5 pl-6 transition",
                board.id === pathname && "bg-primary text-white"
              )}
            >
              <DialogClose asChild>
                <Link
                  href={`/board/${board.id}`}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={iconBoard}
                    alt="Board"
                    className={cn(board.id === pathname && "white-filter")}
                  />
                  <span>{board.title}</span>
                </Link>
              </DialogClose>
            </li>
          ))}
          <li className="w-60 py-3.5 pl-6 text-primary transition">
            <DialogClose asChild>
              <div className="flex items-center gap-3">
                <Image
                  src={iconBoard}
                  alt="Add Task"
                  className="primary-filter"
                />
                <span>Create New Board</span>
              </div>
            </DialogClose>
          </li>
        </ul>
        <DialogFooter className="flex flex-col gap-4">
          <ThemeToggle />
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="mx-auto w-[90%]"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MobileNav;
