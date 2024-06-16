"use client";

import updateUserImage from "@/app/actions/update-user-image";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
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
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const supabase = createClient();
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(user?.id ?? "");

  const [url, setUrl] = useState<string>(
    `${data.publicUrl}?t=${user?.updatedAt}` ?? ""
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <Avatar className="size-32 items-center rounded text-[2rem]">
        <AvatarImage src={url} alt="Profile" />
        <AvatarFallback className="size-48 rounded text-foreground">
          {user?.name?.[0] ?? "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-4">
        <Input
          type="file"
          accept="image/png, image/gif, image/jpeg, image/webp"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
            setUrl(getImageDisplayUrl(e));
          }}
          className="flex-1"
        />
        <Button
          disabled={isUploading || !file}
          className="flex w-32 gap-2"
          onClick={async () => {
            if (file) {
              setIsUploading(true);
              const { data, error } = await supabase.storage
                .from("avatars")
                .upload(user?.id || "", file, { upsert: true });
              if (error) {
                console.log(error.message);
              }
              updateUserImage(user?.id as string, data?.path as string);
              setIsUploading(false);
              setProgress(0);
            }
          }}
        >
          {isUploading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isUploading ? "Uploading" : "Update"}
        </Button>
      </div>
      <Progress
        value={progress}
        className={cn("h-1 w-full invisible", isUploading && "visible")}
      />
    </div>
  );
};

export default UploadImage;
