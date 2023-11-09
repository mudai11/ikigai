import Image from "next/image";
import { randomAnime } from "@/lib/randomizer";
import { Button } from "./ui/button";
import { PlayIcon } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDynamicImage } from "@/lib/getDynamicImage";

const Banner = async () => {
  const anime = await randomAnime();

  if (!anime) return notFound();

  const { base64, img } = await getDynamicImage(
    "https://image.tmdb.org/t/p/original" + anime.image
  );

  return (
    <div className="flex flex-col w-screen space-y-2 py-16 md:space-y-4 h-[45vh] md:h-[55vh] lg:h-[63vh] justify-end lg:pb-12 text-white">
      <div className="absolute top-0 left-0 -z-10 h-[45vh] sm:h-[65vh] md:h-[75vh] lg:h-[95vh] w-screen">
        <div className="absolute z-10 w-screen h-[46vh] sm:h-[66vh] md:h-[76vh] lg:h-[96vh] bg-gradient-to-b from-gray-900/40 to-[#09090b]" />
        <Image
          src={img.src}
          alt={anime.name + " image"}
          fill
          priority
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 100%"
          className="select-none"
          blurDataURL={base64}
          placeholder="blur"
        />
      </div>
      <h2 className="z-20 pl-16 lg:pl-24 w-[250px] sm:w-[50%] left-10 text-[20px] tracking-tight line-clamp-2 mb-3 2xl:mb-4 py-1 px-0] scroll-m-20 md:text-[40px] font-extrabold">
        {anime.name}
      </h2>
      <p className="z-20 pl-16 lg:pl-24 w-[250px] scroll-m-20 tracking-tight line-clamp-2 md:line-clamp-2 mb-3 2xl:mb-4 py-1 px-0 md:text-lg lg:w-[700px] font-medium">
        {anime.description}
      </p>
      <div className="z-20 flex">
        <Link href={`/anime/${anime.id}`}>
          <Button className="flex ml-16 lg:ml-24 items-center justify-center gap-1 bg-[#ffffff] hover:bg-[#f4f4f5] text-black">
            <PlayIcon className="h-5 w-5" />
            <span>Watch now</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
