import Sidebar from "@/components/Sidebar";
import { getBoardsByUserId } from "@/data/board";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import React from "react";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kanban Task Manager",
  description: "A kanban task manager app developed using Next.js 14.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const boards = await getBoardsByUserId(data.user?.id || "");

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-light-gray font-sans antialiase min-h-screen flex flex-col",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-screen items-stretch overflow-hidden">
            <Sidebar user={data.user} boards={boards} />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
