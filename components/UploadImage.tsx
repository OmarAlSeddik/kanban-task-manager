"use client";

import updateAvatar from "@/app/actions/update-avatar";
import { createClient } from "@/lib/supabase/client";
import uploadFile from "@/lib/upload-file";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

function getImageDisplayUrl(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return displayUrl;
}

const UploadImage = ({ user }: { user: User | null }) => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(user?.id ?? "");

  const [url, setUrl] = useState<string>(
    `${data.publicUrl}?t=${user?.updatedAt}` ?? ""
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <Avatar className="size-40 items-center rounded text-[2rem]">
          <AvatarImage src={url} alt="Profile" />
          <AvatarFallback className="rounded text-foreground">
            {user?.name?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
        <Button
          disabled={isPending || !file}
          className="flex flex-1 gap-2"
          onClick={async () => {
            if (file) {
              startTransition(async () => {
                const url = await uploadFile(
                  "avatars",
                  user?.id || "",
                  file,
                  setProgress
                );
                updateAvatar(user?.id as string, url || "");
              });
            }
          }}
        >
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isPending ? "Uploading" : "Update"}
        </Button>
      </div>
      <Input
        type="file"
        accept="image/png, image/gif, image/jpeg, image/webp"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
          setUrl(getImageDisplayUrl(e));
        }}
        className="flex-1"
      />
      <div className={cn("w-full invisible", isPending && "visible")}>
        <Progress value={progress} className={"h-1 flex-1"} />
        <p className="text-sm text-gray4">{progress.toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default UploadImage;
