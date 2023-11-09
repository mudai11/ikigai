import { Badge } from "./ui/badge";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { aniGQSearchType } from "@/types/aniGQSearchType";
import { getDynamicImage } from "@/lib/getDynamicImage";

interface TrendingSectionProps {
  data: aniGQSearchType["media"];
}

const TrendingSection = async ({ data }: TrendingSectionProps) => {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg md:text-2xl font-bold text-white">Trending Now</h2>
      <div className="grid grid-flow-row xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 3xl:grid-cols-10 gap-3">
        {data?.map(async (anime) => {
          const { base64 } = await getDynamicImage(anime.coverImage.extraLarge);

          return (
            <div
              key={anime.id}
              className="relative cursor-pointer overflow-hidden"
            >
              <HoverCard>
                <Link href={`/anime/${anime.id}`}>
                  <HoverCardTrigger asChild>
                    <div className="absolute z-10 rounded-md w-[151px] h-[251px] bg-gradient-to-b from-transparent to-gray-900/80" />
                  </HoverCardTrigger>
                </Link>
                <Link href={`/anime/${anime.id}`}>
                  <p className="absolute z-10 bottom-2 line-clamp-1 text-white mx-2">
                    {anime.title.userPreferred}
                  </p>
                </Link>
                <div className="relative h-[250px] w-[150px] rounded-sm overflow-hidden">
                  <Image
                    src={anime.coverImage.extraLarge}
                    alt={anime.title.userPreferred + " image"}
                    className="rounded-md w-[150px] h-[250px]"
                    width={150}
                    height={250}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 100%"
                    blurDataURL={base64}
                    placeholder="blur"
                  />
                </div>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <span className="border-b p-3 font-semibold">
                      {anime.title.userPreferred}
                    </span>
                    {anime.description != null ? (
                      <div className="line-clamp-5 text-xs">
                        {anime.description.replace(/(<([^>]+)>)/gi, "")}
                      </div>
                    ) : (
                      <div className="line-clamp-5 text-xs">
                        There&apos;s no description for this anime.
                      </div>
                    )}
                    <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
                      {anime.genres.map((genre, i: number) => (
                        <Link key={i} href={`/catalog/anime?genres=${genre}`}>
                          <Badge>{genre}</Badge>
                        </Link>
                      ))}
                    </div>
                    <div>
                      {anime.format} . {anime.status}
                      {anime.format.toLowerCase() === "movie"
                        ? ""
                        : anime.episodes > 1
                        ? ` . ${anime.episodes} Episodes`
                        : anime.episodes === 1
                        ? ` . ${anime.episodes} Episode`
                        : ""}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingSection;
