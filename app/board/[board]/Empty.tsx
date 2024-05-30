import { Button } from "@/components/ui/button";
import iconAddTaskMobile from "@/public/icon-add-task-mobile.svg";
import Image from "next/image";

const Empty = () => {
  return (
    <main className="container flex h-full grow items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center text-gray4">
          <p>This board is empty.</p>
          <p>Create a new column to get started.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Image src={iconAddTaskMobile} alt="Add New Column" />
          <span>Add New Column</span>
        </Button>
      </div>
    </main>
  );
};

export default Empty;
