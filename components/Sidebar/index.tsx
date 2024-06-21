"use client";

import ExtendedUser from "@/lib/types/ExtendedUser";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ButtonContainer from "./ButtonContainer";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Profile from "./Profile";
import SidebarToggle from "./SidebarToggle";

const Sidebar = ({ user }: { user: ExtendedUser | null }) => {
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
          <Navigation user={user} />
        </div>
        <div className="flex flex-col gap-8">
          <Profile user={user} />
          <ButtonContainer setIsActive={setIsActive} />
        </div>
      </div>
      <SidebarToggle isActive={isActive} setIsActive={setIsActive} />
    </aside>
  );
};

export default Sidebar;
