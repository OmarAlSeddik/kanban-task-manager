import { cn } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";

const FormResult = ({
  errorMessage,
  successMessage,
  className,
}: {
  errorMessage?: string;
  successMessage?: string;
  className?: string;
}) => {
  if (!errorMessage && !successMessage) return null;

  return (
    <div
      className={cn(
        "flex gap-4 items-center text-xs absolute bottom-2",
        errorMessage && "text-destructive",
        successMessage && "text-green-500",
        className
      )}
    >
      {errorMessage ? (
        <CircleX className="size-4" />
      ) : (
        <CircleCheck className="size-4" />
      )}
      <span>{errorMessage || successMessage}</span>
    </div>
  );
};

export default FormResult;
