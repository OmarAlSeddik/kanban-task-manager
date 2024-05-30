import deleteColumn from "@/app/actions/delete-column";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Column } from "@prisma/client";

const DeleteBoardForm = ({ column }: { column: Column | null | undefined }) => {
  const title = column?.title;

  return (
    <div className="flex h-screen flex-col justify-center gap-6 rounded bg-white p-8 dark:bg-gray2 md:h-auto">
      <h2 className="text-[1.125rem] text-destructive">Delete this column?</h2>
      <p className="text-[0.8125rem] text-gray4">
        Are you sure you want to delete the{" "}
        <span className="font-bold text-destructive">&quot;{title}&quot;</span>{" "}
        column? This action will remove all of its tasks and cannot be reversed.
      </p>
      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => {
            deleteColumn(column?.id);
          }}
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
