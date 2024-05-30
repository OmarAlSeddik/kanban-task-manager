"use client";

import { cn } from "@/lib/utils";
import { Board } from "@prisma/client";
import { useState } from "react";
import ButtonContainer from "./ButtonContainer";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SidebarToggle from "./SidebarToggle";

const Sidebar = ({
  user,
  boards,
}: {
  user: any;
  boards: Board[] | null | undefined;
}) => {
  const [isActive, setIsActive] = useState(false);
  if (!user) return null;

  return (
    <aside
      className={cn(
        "min-h-screen w-0 dark:bg-gray2 bg-white hidden md:flex relative transition-all border-r text-gray4",
        {
          "w-[18.75rem]": isActive,
        }
      )}
    >
      <div
        className={cn(
          "w-[18.75rem] -translate-x-[18.75rem] flex-col flex justify-between py-4 transition",
          {
            "translate-x-0 delay-150": isActive,
          }
        )}
      >
        <div className="flex flex-col gap-12">
          <Logo />
          <Navigation boards={boards} />
        </div>

        <ButtonContainer setIsActive={setIsActive} />
      </div>
      <SidebarToggle isActive={isActive} setIsActive={setIsActive} />
    </aside>
  );
};

export default Sidebar;
