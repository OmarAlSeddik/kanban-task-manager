"use client";

import DeleteBoardForm from "@/components/forms/DeleteBoardForm";
import RenameBoardForm from "@/components/forms/RenameBoardForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import iconVerticalEllipsis from "@/public/icon-vertical-ellipsis.svg";
import { Board } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const Edit = ({ board }: { board: Board | null }) => {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="group">
            <Image
              src={iconVerticalEllipsis}
              alt="Edit Board"
              className="group-hover:white-filter transition-all"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={isRenameDialogOpen || isDeleteDialogOpen}
        onOpenChange={
          isRenameDialogOpen ? setIsRenameDialogOpen : setIsDeleteDialogOpen
        }
      >
        <DialogContent>
          {isRenameDialogOpen && <RenameBoardForm board={board} />}
          {isDeleteDialogOpen && <DeleteBoardForm board={board} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit;
