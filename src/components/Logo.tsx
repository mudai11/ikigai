import Image from "next/image";
import whitelogo from "../../public/whitecloud.webp";
import Link from "next/link";

const Logo = async () => {
  return (
    <Link
      className="flex justify-center items-center cursor-pointer"
      href="/browse"
    >
      <div className="relative flex justify-center items-center h-8 w-8">
        <Image src={whitelogo.src} alt="senshi logo" fill sizes="100%" />
      </div>
      <p className="hidden scroll-m-20 text-md font-extrabold tracking-tight md:block lg:text-xl">
        <span className="text-[#FF0000]">Iki</span>gai
      </p>
    </Link>
  );
};

export default Logo;
