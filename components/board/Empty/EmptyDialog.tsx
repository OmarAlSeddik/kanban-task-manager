"use client";

import AddColumnForm from "@/components/forms/AddColumnForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import iconAddTaskMobile from "@/public/icon-add-task-mobile.svg";
import Image from "next/image";
import { useState } from "react";

const EmptyDialog = ({ boardId }: { boardId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Image src={iconAddTaskMobile} alt="Add New Column" />
          <span>Add New Column</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddColumnForm boardId={boardId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EmptyDialog;
