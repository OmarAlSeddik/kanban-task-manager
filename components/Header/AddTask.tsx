"use client";

import iconAddTaskMobile from "@/public/icon-add-task-mobile.svg";
import { Column } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import AddTaskForm from "../forms/AddTaskForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const AddTask = ({
  columns,
  boardId,
}: {
  columns: Column[] | null | undefined;
  boardId: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2" disabled={columns?.length === 0}>
          <Image src={iconAddTaskMobile} alt="Add Task" />
          <span className="hidden md:block">Add New Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddTaskForm boardId={boardId} columns={columns} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
