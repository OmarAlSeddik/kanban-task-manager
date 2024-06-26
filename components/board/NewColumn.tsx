"use client";

import AddColumnForm from "@/components/forms/AddColumnForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const NewColumn = ({ boardId }: { boardId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex h-full w-[17.5rem] shrink-0 cursor-pointer snap-center items-center justify-center rounded bg-white text-gray4 transition hover:bg-white/50 dark:bg-gray2 dark:hover:bg-gray2/50">
          + New Column
        </div>
      </DialogTrigger>
      <DialogContent>
        <AddColumnForm boardId={boardId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewColumn;
