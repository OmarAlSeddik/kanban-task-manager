import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const SubmitButton = ({
  children,
  className,
  variant,
  isPending,
}: {
  children?: React.ReactNode;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  isPending: boolean;
}) => {
  return (
    <>
      {isPending ? (
        <Button
          type="submit"
          variant={variant ?? "default"}
          disabled
          className={cn("flex gap-2", className)}
        >
          <Loader2 className="size-4 animate-spin" />
          <span>Pending...</span>
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant ?? "default"}
          className={cn("flex gap-2", className)}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
