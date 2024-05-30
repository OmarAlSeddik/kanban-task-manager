import logoMobile from "@/public/logo-mobile.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex h-full items-center gap-4 px-4 md:border-r">
      <Image src={logoMobile} alt="Logo" priority />
      <p className="hidden text-[2rem] font-bold text-black dark:text-white md:block">
        kanban
      </p>
    </div>
  );
};

export default Logo;
