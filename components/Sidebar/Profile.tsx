import { createClient } from "@/lib/supabase/client";
import { User } from "@prisma/client";
import UploadImage from "../UploadImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const Profile = ({ user }: { user: User }) => {
  const supabase = createClient();
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(user?.id ?? "");
  const url = `${data.publicUrl}?t=${user?.updatedAt}` ?? "";

  return (
    <Dialog>
      <DialogTrigger className="mx-auto flex w-[90%] cursor-pointer items-center gap-4 rounded bg-gray6 px-4 py-2 transition hover:bg-gray6/80 dark:bg-gray1 dark:hover:bg-gray1/80">
        <Avatar>
          <AvatarImage src={url} />
          <AvatarFallback>{user.name?.[0] || ""}</AvatarFallback>
        </Avatar>
        <h2>{user.name}</h2>
      </DialogTrigger>
      <DialogContent>
        <UploadImage user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
