import AddTaskForm from "@/components/forms/AddTaskForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getBoardById, getBoardsByUserId } from "@/data/board";
import { getColumnsByBoardId } from "@/data/column";
import { createClient } from "@/lib/supabase/server";
import iconAddTaskMobile from "@/public/icon-add-task-mobile.svg";
import Image from "next/image";
import Edit from "./Edit";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

const Header = async ({ boardId }: { boardId: string }) => {
  const board = await getBoardById(boardId);
  const columns = await getColumnsByBoardId(boardId);

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const boards = await getBoardsByUserId(data.user?.id || "");

  return (
    <header className="absolute inset-x-0 top-0 flex h-16 justify-between border-b bg-white dark:bg-gray2 md:h-20 lg:h-24">
      <div className="flex items-center justify-between gap-4 px-4 md:px-0">
        <Logo />
        <h1 className="hidden text-[1.25rem] font-bold md:block">
          {board?.title}
        </h1>
        <MobileNav title={board?.title} boards={boards} />
      </div>
      <div className="flex items-center gap-4 px-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2" disabled={columns?.length === 0}>
              <Image src={iconAddTaskMobile} alt="Add Task" />
              <span className="hidden md:block">Add New Task</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddTaskForm boardId={boardId} columns={columns} />
          </DialogContent>
        </Dialog>
        <Edit board={board} />
      </div>
    </header>
  );
};

export default Header;
