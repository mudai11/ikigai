"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { aniGQSearchType } from "@/types/aniGQSearchType";
import SearchAndFilter from "./SearchAndFilter";

const AdvancedSearch = () => {
  const [nextPage, setNextPage] = useState(true);
  const lastResultRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { ref, entry } = useIntersection({
    root: lastResultRef.current,
    threshold: 1,
  });
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
    isInitialLoading,
  } = useInfiniteQuery({
    queryKey: ["infinite-query"],
    queryFn: async ({ pageParam = 1 }) => {
      if (!searchParams) {
        const { data } = await axios.get("/api/advancedsearch");
        const results = data as aniGQSearchType;
        setNextPage(results.pageInfo.hasNextPage);
        return results.media;
      }
      const { data } = await axios.get(
        `/api/advancedsearch?search=${
          searchParams.has("search") ? `${searchParams.get("search")}` : ""
        }&type=${
          pathname!.substring(pathname!.lastIndexOf("/") + 1) === "anime"
            ? "ANIME"
            : "MANGA"
        }&genres=${
          searchParams.has("genres") ? `${[searchParams.get("genres")!]}` : ""
        }&format=${
          searchParams.has("format") ? `${[searchParams.get("format")!]}` : ""
        }&page=${pageParam}&sort=${
          searchParams.has("sort")
            ? searchParams.get("sort")!
            : "POPULARITY_DESC"
        }`
      );
      const results = data as aniGQSearchType;
      setNextPage(results.pageInfo.hasNextPage);
      return results.media;
    },
    enabled: false,
    staleTime: Infinity,
    cacheTime: 0,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      if (!nextPage) return;
      fetchNextPage();
    }
  }, [entry, fetchNextPage, nextPage]);
  useEffect(() => {
    queryClient.setQueryData(["infinite-query"], (oldData: any) => ({
      pages: oldData?.pages?.slice(0, 1),
      pageParams: [1],
    }));
    queryClient.refetchQueries(["infinite-query"], {
      refetchPage: (_, index) => index === 0,
    });
  }, [searchParams, pathname, queryClient]);
  useEffect(() => {
    if (!isInitialLoading) {
      refetch();
    }
  }, [searchParams, pathname, isInitialLoading, refetch]);
  const results = data?.pages?.flatMap((page) => page);

  return (
    <div className="flex flex-col items-center gap-6">
      <SearchAndFilter />
      <div className="flex flex-col  items-center">
        <AnimatePresence>
          <div
            key="card-keys"
            className="grid pt-3 mb-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 justify-items-center g xxs:grid-cols-3 w-screen px-2 xl:w-auto xl:gap-10 gap-2 xl:gap-y-24 gap-y-12 overflow-hidden"
          >
            {isRefetching || isInitialLoading ? (
              <>
                {[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col w-[135px] xl:w-[185px] gap-5"
                    style={{ scale: 0.98 }}
                  >
                    <Skeleton className="h-[192px] w-[135px] xl:h-[265px] xl:w-[185px]" />
                    <Skeleton className="w-[110px] h-[30px]" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {results?.map((anime, index) => (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-[146px] xxs:w-[115px] xs:w-[135px] xl:w-[185px]"
                    key={index}
                    ref={index === results.length - 1 ? ref : null}
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link
                          href={`/${
                            pathname!.substring(
                              pathname!.lastIndexOf("/") + 1
                            ) === "anime"
                              ? "anime"
                              : "manga"
                          }/${anime.id}`}
                        >
                          <Image
                            style={{
                              backgroundColor: anime.coverImage.color,
                            }}
                            className="object-cover bg-[#3B3C41] w-[146px] h-[208px] xxs:w-[115px] xxs:h-[163px] xs:w-[135px] xs:h-[192px] xl:w-[185px] xl:h-[265px] hover:scale-105 scale-100 transition-all cursor-pointer duration-200 ease-out rounded-[10px]"
                            src={anime.coverImage.extraLarge}
                            alt={anime.title.userPreferred}
                            width={500}
                            height={500}
                            priority
                          />
                        </Link>
                      </HoverCardTrigger>
                      <Link
                        href={`/${
                          pathname!.substring(
                            pathname!.lastIndexOf("/") + 1
                          ) === "anime"
                            ? "anime"
                            : "manga"
                        }/${anime.id}`}
                      >
                        <h2 className="font-outfit font-bold xl:text-base text-[15px] pt-4 line-clamp-1">
                          {anime.title.userPreferred}
                        </h2>
                      </Link>
                      <span className="font-outfit text-[9px] font-light pt-2">
                        {anime.format || <p>-</p>} &#183;{" "}
                        {anime.status || <p>-</p>}
                        {pathname!.substring(pathname!.lastIndexOf("/") + 1) ===
                          "anime" && <>&#183; {anime.episodes || 0} Episodes</>}
                      </span>
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
                            {anime.genres.map((genre: string, i: number) => (
                              <Badge key={i} className="cursor-default">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs">
                            {anime.type}
                            {anime.episodes === 0 ? "" : ` . ${anime.status} `}
                            {anime.episodes > 1
                              ? `. ${anime.episodes} Episodes`
                              : anime.episodes === 1
                              ? `. ${anime.episodes} Episode`
                              : ""}
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </motion.div>
                ))}
              </>
            )}
            {isFetchingNextPage ? (
              <>
                {[1, 2, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col w-[135px] xl:w-[185px] gap-5"
                    style={{ scale: 0.98 }}
                  >
                    <Skeleton className="h-[192px] w-[135px] xl:h-[265px] xl:w-[185px]" />
                    <Skeleton className="w-[110px] h-[30px]" />
                  </div>
                ))}
                <div />
              </>
            ) : null}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedSearch;
