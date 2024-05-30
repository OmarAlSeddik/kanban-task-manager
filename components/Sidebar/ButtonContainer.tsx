import signOut from "@/app/actions/signout";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import iconHideSidebar from "@/public/icon-hide-sidebar.svg";
import { LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

const ButtonContainer = ({
  setIsActive,
}: {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto flex w-[90%] gap-4">
        <Button
          className="flex flex-1 select-none items-center gap-4 rounded py-6"
          onClick={() => setIsActive(false)}
        >
          <Image
            src={iconHideSidebar}
            alt="Hide Sidebar"
            className="white-filter"
          />
          <span>Hide</span>
        </Button>
        <Button
          variant="destructive"
          className="flex flex-1 select-none items-center gap-4 rounded py-6"
          onClick={() => {
            signOut();
            setIsActive(false);
          }}
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </Button>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default ButtonContainer;
