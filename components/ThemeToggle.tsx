"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import iconDarkTheme from "@/public/icon-dark-theme.svg";
import iconLightTheme from "@/public/icon-light-theme.svg";
import Image from "next/image";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="mx-auto flex w-[90%] items-center justify-center gap-6 rounded bg-gray6 p-3.5 dark:bg-gray1">
      <Image src={iconLightTheme} alt="Light Theme" />
      <Button
        className="relative h-5 w-10 rounded-full bg-primary p-0"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className="absolute left-[3px] size-3.5 rounded-full bg-white transition-all dark:left-[23px]" />
      </Button>
      <Image src={iconDarkTheme} alt="Dark Theme" />
    </div>
  );
}

export default ThemeToggle;
