import {
  getPopularAnimes,
  getMostFavoritedAnimes,
  getHighestScoredAnimes,
  getTrendingAnimes,
} from "@/lib/animesFetcher";
import Banner from "@/components/Banner";
import Image from "next/image";
import AIChatTrigger from "@/components/AIChatTrigger";
import ShowcaseSection from "@/components/ShowcaseSection";
import { notFound } from "next/navigation";
import TrendingSection from "@/components/TrendingSection";
import Link from "next/link";
import { getDynamicImage } from "@/lib/getDynamicImage";

export const dynamic = "force-dynamic";

export default async function Browse() {
  const [
    trendingAnimes,
    highestScoredAnimes,
    mostFavoritedAnimes,
    popularAnimes,
    { base64 },
  ] = await Promise.all([
    getTrendingAnimes(),
    getHighestScoredAnimes(),
    getMostFavoritedAnimes(),
    getPopularAnimes(),
    getDynamicImage(
      "https://res.cloudinary.com/dxxqw4uco/image/upload/v1691662978/confusedthorfin_rfquof.webp"
    ),
  ]);

  if (
    !trendingAnimes ||
    !popularAnimes ||
    !highestScoredAnimes ||
    !mostFavoritedAnimes
  )
    return notFound();

  return (
    <div className="relative pb-24 space-y-12 overflow-x-hidden">
      <Banner />
      <main className="flex flex-col justify-center items-center gap-14 lg:justify-start w-screen">
        <TrendingSection data={trendingAnimes} />
        <section className="flex flex-col justify-between items-center gap-6 2xl:flex-row mx-2">
          <ShowcaseSection
            title="Highest Scored"
            data={highestScoredAnimes}
            params="sort=SCORE_DESC"
          />
          <ShowcaseSection
            title="Most Popular"
            data={popularAnimes}
            params="sort=POPULARITY_DESC"
          />
          <ShowcaseSection
            title="Most Favorited"
            data={mostFavoritedAnimes}
            params="sort=FAVOURITES_DESC"
          />
        </section>
        <section className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Image
            src="https://res.cloudinary.com/dxxqw4uco/image/upload/v1691662978/confusedthorfin_rfquof.webp"
            alt={"Thorfin confused"}
            width={300}
            height={228}
            className="px-2 md:px-0"
            blurDataURL={base64}
            placeholder="blur"
          />
          <div className="flex flex-col items-center px-2">
            <h2 className="text-md sm:text-lg md:text-2xl font-bold">
              Still Can&apos;t Make Up Your Mind ?
            </h2>
            <p className="hidden xs:block text-md md:text-lg">
              Talk with Ikigai-AI and ask it for recommendation.{" "}
            </p>
            <AIChatTrigger />
            <span className="hidden xs:block text-md md:text-lg">Or</span>
            <p className="text-md md:text-lg">
              Check out the{" "}
              <Link href="/catalog/anime">
                <span className="underline cursor-pointer">catalog.</span>
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
