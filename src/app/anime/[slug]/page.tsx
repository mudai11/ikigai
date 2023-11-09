import Player from "@/components/Player";
import RelationsSection from "@/components/RelationsSection";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { aniMediaInfo } from "@/lib/anilistFetcher";
import { getDynamicImage } from "@/lib/getDynamicImage";
import { posterFinder } from "@/lib/posterFinder";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { slug } = params;
  const data = await aniMediaInfo(slug);
  if (data === null) return {};
  return {
    title: data.title.romaji,
    description: data.description,
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;
  const data = await aniMediaInfo(slug);
  if (data === null) return notFound();
  const [
    { base64: bannerBase64, img: bannerImage },
    { base64: coverExtraLargeBase64, img: coverExtraLarge },
    { base64: coverLargeBase64, img: coverLarge },
    poster,
  ] = await Promise.all([
    getDynamicImage(data.bannerImage),
    getDynamicImage(data.coverImage.extraLarge),
    getDynamicImage(data.coverImage.large),
    posterFinder(data.title.english),
  ]);

  return (
    <main>
      <div className="bg-gradient-to-b from-gray-900/40 to-[#09090b] absolute h-[315px] w-full z-10" />
      <Image
        src={bannerImage.src || coverExtraLarge.src || coverLarge.src}
        priority
        alt="anime banner"
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover w-screen absolute h-[310px] z-0"
        blurDataURL={bannerBase64 || coverExtraLargeBase64 || coverLargeBase64}
        placeholder="blur"
      />
      <div className="w-full min-h-screen relative flex flex-col items-center gap-5">
        <section className="lg:w-[90%] xl:w-[75%] pt-[12rem] z-30 flex flex-col gap-5 ">
          <div className="flex flex-row px-5 lg:px-0 gap-6 justify-start">
            <Image
              src={coverExtraLarge.src || coverLarge.src}
              alt={data.title.romaji + " image"}
              width={200}
              height={300}
              className="hidden sm:block rounded-md w-[200px] h-[300px]"
              blurDataURL={coverExtraLargeBase64 || coverLargeBase64}
              placeholder="blur"
            />
            <div className="flex flex-col gap-5">
              <h1 className="text-lg md:text-4xl font-bold px-2 sm:px-0">
                {data.title.romaji}
              </h1>
              <div className="flex flex-row flex-wrap gap-3 cursor-default">
                {data.duration != null && <Badge>{data.duration} mins</Badge>}
                {data.episodes > 0 && (
                  <Badge>
                    {data.episodes > 1
                      ? `${data.episodes} Episodes`
                      : `${data.episodes} Episode`}
                  </Badge>
                )}
                <Badge>{data.status}</Badge>
                {data.genres.map((genre: string, i: number) => (
                  <Badge key={i}>{genre}</Badge>
                ))}
              </div>
              {data.studios.nodes.length > 0 && (
                <div className="font-semibold">
                  Studio : {data.studios.nodes[0].name}
                </div>
              )}
              {data.description === null ? (
                <div>
                  This anime.mediaRecommendation.mediaRecommendation
                  doesn&apos;t have a description
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              )}
            </div>
          </div>
          <RelationsSection data={data.relations.edges} />
        </section>
        {data.status != "NOT_YET_RELEASED" && (
          <Player
            id={data.id}
            idMal={data.idMal}
            image={
              poster != undefined
                ? "https://image.tmdb.org/t/p/original" + poster.image
                : data.bannerImage
            }
            next={
              data.nextAiringEpisode
                ? data.nextAiringEpisode.timeUntilAiring
                : undefined
            }
          />
        )}
        {data.recommendations.nodes.length > 0 && (
          <section className="lg:w-[90%] xl:w-[75%] z-30 flex flex-col gap-5 mb-10">
            <div className="lg:w-[90%] xl:w-[75%] flex gap-5 items-center">
              <h2 className="p-3 lg:p-0 text-[20px] lg:text-2xl font-bold">
                Recommended for you
              </h2>
            </div>
            <div className="flex flex-col  items-center">
              <div
                key="card-keys"
                className="grid pt-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 justify-items-center g xxs:grid-cols-3 w-screen px-2 xl:w-auto xl:gap-10 gap-2 xl:gap-y-24 gap-y-12 overflow-hidden"
              >
                {data.recommendations.nodes
                  .slice(0, 12)
                  .map(async (anime, index: number) => {
                    const { base64 } = await getDynamicImage(
                      anime.mediaRecommendation.coverImage.extraLarge
                    );
                    return (
                      <div
                        className="w-[146px] xxs:w-[115px] xs:w-[135px] xl:w-[185px]"
                        key={index}
                      >
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Link
                              href={`/anime/${anime.mediaRecommendation.id}`}
                            >
                              <Image
                                className="object-cover bg-[#3B3C41] w-[146px] h-[208px] xxs:w-[115px] xxs:h-[163px] xs:w-[135px] xs:h-[192px] 3xl:w-[185px] 3xl:h-[265px] hover:scale-105 scale-100 transition-all cursor-pointer duration-200 ease-out rounded-[10px]"
                                src={
                                  anime.mediaRecommendation.coverImage
                                    .extraLarge
                                }
                                alt={anime.mediaRecommendation.title.romaji}
                                width={500}
                                height={500}
                                blurDataURL={base64}
                                placeholder="blur"
                                priority
                              />
                            </Link>
                          </HoverCardTrigger>
                          <Link href={`/anime/${anime.mediaRecommendation.id}`}>
                            <h2 className="font-outfit font-bold xl:text-base text-[15px] pt-4 line-clamp-1">
                              {anime.mediaRecommendation.title.romaji}
                            </h2>
                          </Link>
                          <span className="font-outfit text-[9px] font-light pt-2">
                            {anime.mediaRecommendation.format || <p>-</p>}{" "}
                            &#183;{" "}
                            {anime.mediaRecommendation.status || <p>-</p>}{" "}
                            &#183; {anime.mediaRecommendation.episodes || 0}{" "}
                            Episodes
                          </span>
                          <HoverCardContent className="w-80">
                            <div className="flex flex-col gap-2">
                              <span className="border-b p-3 font-semibold">
                                {anime.mediaRecommendation.title.romaji}
                              </span>
                              {anime.mediaRecommendation.description != null ? (
                                <div className="line-clamp-5 text-xs">
                                  {anime.mediaRecommendation.description.replace(
                                    /(<([^>]+)>)/gi,
                                    ""
                                  )}
                                </div>
                              ) : (
                                <div className="line-clamp-5 text-xs">
                                  There&apos;s no description for this
                                  anime.mediaRecommendation.
                                </div>
                              )}
                              <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
                                {anime.mediaRecommendation.genres.map(
                                  (genre: string, i: number) => (
                                    <Badge key={i} className="cursor-default">
                                      {genre}
                                    </Badge>
                                  )
                                )}
                              </div>
                              <div className="text-xs">
                                {anime.mediaRecommendation.episodes === 0
                                  ? ""
                                  : `${anime.mediaRecommendation.status} `}
                                {anime.mediaRecommendation.episodes > 1
                                  ? `. ${anime.mediaRecommendation.episodes} Episodes`
                                  : anime.mediaRecommendation.episodes === 1
                                  ? `. ${anime.mediaRecommendation.episodes} Episode`
                                  : ""}
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default page;
