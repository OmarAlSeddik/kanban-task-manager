import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import iconAddTaskMobile from "@/public/icon-add-task-mobile.svg";
import Image from "next/image";
import AddColumnForm from "../forms/AddColumnForm";

const Empty = ({ boardId }: { boardId: string }) => {
  return (
    <main className="container flex h-full items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-8">
        <p className="text-gray4">
          This board is empty. Create a new column to get started.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Image src={iconAddTaskMobile} alt="Add New Column" />
              <span>Add New Column</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddColumnForm boardId={boardId} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default Empty;
