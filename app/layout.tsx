import Sidebar from "@/components/Sidebar";
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
  const user = null;
  const boards = null;

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
            <Sidebar user={user} boards={boards} />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
