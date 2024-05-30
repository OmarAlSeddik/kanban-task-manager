import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const SubmitButton = ({
  children,
  className,
  isPending,
}: {
  children?: React.ReactNode;
  className?: string;
  isPending: boolean;
}) => {
  return (
    <>
      {isPending ? (
        <Button type="submit" disabled className={cn("flex gap-2", className)}>
          <Loader2 className="size-4 animate-spin" />
          <span>Pending...</span>
        </Button>
      ) : (
        <Button type="submit" className={cn("flex gap-2", className)}>
          {children}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
