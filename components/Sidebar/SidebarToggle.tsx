import { Button } from "@/components/ui/button";
import iconHideSidebar from "@/public/icon-hide-sidebar.svg";
import iconShowSidebar from "@/public/icon-show-sidebar.svg";
import Image from "next/image";
import React from "react";

const SidebarToggle = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Button
      className="absolute -right-14 bottom-24 z-50 h-12 w-14 select-none rounded-l-none rounded-r-full transition"
      onClick={() => setIsActive((prev) => !prev)}
    >
      {isActive ? (
        <Image
          src={iconHideSidebar}
          alt="Hide Sidebar"
          className="white-filter"
        />
      ) : (
        <Image src={iconShowSidebar} alt="Show Sidebar" />
      )}
    </Button>
  );
};

export default SidebarToggle;
