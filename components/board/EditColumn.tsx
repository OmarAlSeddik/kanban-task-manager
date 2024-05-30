"use client";

import DeleteColumnForm from "@/components/forms/DeleteColumnForm";
import RenameColumnForm from "@/components/forms/RenameColumnForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import iconVerticalEllipsis from "@/public/icon-vertical-ellipsis.svg";
import { Column } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const EditColumn = ({ column }: { column: Column | null | undefined }) => {
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
          {isRenameDialogOpen && <RenameColumnForm column={column} />}
          {isDeleteDialogOpen && <DeleteColumnForm column={column} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditColumn;
