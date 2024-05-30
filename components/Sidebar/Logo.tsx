import logoMobile from "@/public/logo-mobile.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-4 px-4">
      <Image src={logoMobile} alt="Logo" />
      <p className="text-[2rem] font-bold text-black dark:text-white md:block">
        kanban
      </p>
    </div>
  );
};

export default Logo;
