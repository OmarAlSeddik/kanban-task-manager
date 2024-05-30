import deleteBoard from "@/app/actions/delete-board";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Board } from "@prisma/client";

const DeleteBoardForm = ({ board }: { board: Board | null | undefined }) => {
  return (
    <div className="flex h-screen flex-col justify-center gap-6 rounded bg-white p-8 dark:bg-gray2 md:h-auto">
      <h2 className="text-[1.125rem] text-destructive">Delete this board?</h2>
      <p className="text-[0.8125rem] text-gray4">
        Are you sure you want to delete the &quot;{board?.title}&quot; board?
        This action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => deleteBoard(board?.id)}
        >
          Delete
        </Button>
        <DialogClose asChild>
          <Button variant="secondary" className="flex-1">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default DeleteBoardForm;
