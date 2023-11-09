import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRightFromLine } from "lucide-react";
import bgimage from "../../public/sb1ybl6cxf4b1.webp";
import logo from "../../public/whitecloud.webp";
import Link from "next/link";
import { getImages } from "@/lib/getImages";

const LandingPageBanner = async () => {
  const { base64: bgImageBase64 } = await getImages(
    "./public/sb1ybl6cxf4b1.webp"
  );

  return (
    <div className="flex flex-col w-screen space-y-2 py-16 md:space-y-4 h-screenjustify-end lg:pb-12 text-white">
      <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
        <div className="absolute z-10 w-screen h-screen bg-gradient-to-b from-gray-900/40 to-[#09090b]" />
        <Image
          src={bgimage.src}
          alt="background image"
          fill
          priority
          blurDataURL={bgImageBase64}
          className="object-cover"
          placeholder="blur"
        />
      </div>
      <h1 className="z-20 flex flex-row items-center gap-2 pl-16 lg:pl-24 w-[250px] sm:w-[50%] left-10 text-[20px] tracking-tight line-clamp-2 mb-3 2xl:mb-4 py-1 px-0] scroll-m-20 md:text-[40px] font-extrabold">
        <p>
          Welcome to <span className="text-[#FF0000]">Iki</span>gai
        </p>
        <Image
          src={logo.src}
          alt="ikigai logo"
          width={50}
          height={50}
          className="w-[50px] h-[50px] hidden lg:block"
        />
      </h1>
      <p className="z-20 pl-16 lg:pl-24 w-[250px] scroll-m-20 tracking-tight line-clamp-2 md:line-clamp-2 mb-3 2xl:mb-4 py-1 px-0 md:text-lg lg:w-[700px] font-medium">
        WATCH UNLIMITED ANIME, MOVIES AND MORE FOR FREE.
      </p>
      <div className="z-20 flex">
        <Link href="/browse">
          <Button className="flex ml-16 lg:ml-24 items-center justify-center gap-1 bg-[#ffffff] hover:bg-[#f4f4f5] text-black">
            <span>Enter</span>
            <ArrowRightFromLine className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageBanner;
