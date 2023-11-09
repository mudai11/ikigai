import { Badge } from "./ui/badge";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { aniGQSearchType } from "@/types/aniGQSearchType";
import { getDynamicImage } from "@/lib/getDynamicImage";

interface ShowcaseSectionProps {
  title: string;
  data: aniGQSearchType["media"];
  params: string;
}

const ShowcaseSection = async ({
  title,
  data,
  params,
}: ShowcaseSectionProps) => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg md:text-2xl font-bold px-2 sm:px-0">{title}</h2>
      <div className="flex flex-col gap-4">
        {data?.map(async (anime) => {
          const { base64 } = await getDynamicImage(anime.coverImage.extraLarge);
          return (
            <div
              key={anime.id}
              className="relative flex flex-row gap-4 overflow-hidden border-b h-[125px] w-screen px-2 sm:w-full sm:px-0 sm:min-w-[410px]"
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href={`/anime/${anime.id}`}>
                    <div className="rounded-sm overflow-hidden cursor-pointer">
                      <Image
                        src={anime.coverImage.extraLarge}
                        alt={anime.title.userPreferred + " image"}
                        width={100}
                        height={120}
                        className="h-[120px] w-[100px]"
                        blurDataURL={base64}
                        placeholder="blur"
                      />
                    </div>
                  </Link>
                </HoverCardTrigger>
                <div className="flex flex-col justify-around gap-2">
                  <Link href={`/anime/${anime.id}`}>
                    <div className="cursor-pointer line-clamp-1 max-w-[250px]">
                      {anime.title.userPreferred}
                    </div>
                  </Link>
                  <div className="flex flex-row flex-wrap items-center justify-start gap-3">
                    {anime.episodes &&
                      anime.format.toLowerCase() != "movie" && (
                        <Badge className="cursor-default">
                          {anime.episodes}|EP
                        </Badge>
                      )}
                  </div>
                  <div className="flex flex-row flex-wrap items-center justify-start gap-3">
                    {anime.format} . {anime.status}
                  </div>
                </div>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <span className="border-b p-3 font-semibold">
                      {anime.title.userPreferred}
                    </span>
                    <div className="line-clamp-5 text-xs">
                      {anime.description.replace(/(<([^>]+)>)/gi, "")}
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
                      {anime.genres.map((genre: any, i: number) => (
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
      <Link href={`/catalog/anime?${params}`} className="h-full w-full">
        <Button variant="ghost" className="h-full w-full">
          See more <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
};

export default ShowcaseSection;
