import Image from "next/image";
import musashi from "../../../../public/musashinobg.webp";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

const getImages = async (src: string) => {
  const buffer = await fs.readFile(src);

  const plaiceholder = await getPlaiceholder(buffer);

  return { ...plaiceholder, img: { src } };
};

const page = async () => {
  const { base64: bgImageBase64 } = await getImages(
    "./public/musashinobg.webp"
  );

  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
      <Image
        src={musashi.src}
        alt={"Mushashi Miyamoto"}
        width={450}
        height={250}
        className="h-[250px] w-[450px]"
        blurDataURL={bgImageBase64}
        placeholder="blur"
      />
      <span className="font-bold text-3xl">
        This page is still under construction,
      </span>
      <span className="font-bold text-3xl">
        please come back later when it&apos;s done.
      </span>
    </div>
  );
};

export default page;
