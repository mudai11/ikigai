"use client";

import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  SearchCommand,
  SearchCommandEmpty,
  SearchCommandGroup,
  SearchCommandInput,
  SearchCommandItem,
  SearchCommandList,
} from "./ui/searchcommand";
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchResultAvatar from "./SearchResultAvatar";
import { Badge } from "./ui/badge";
import { useDebouceQuery } from "@/hooks/useDebounceQuery";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { usePathname, useRouter } from "next/navigation";
import { useIsScrolled } from "@/hooks/useIsScrolled";
import { aniGQSearchType } from "@/types/aniGQSearchType";

type AnimeSearchDialogProps = {
  initialData: aniGQSearchType["media"];
};

const AnimeSearchDialog: FC<AnimeSearchDialogProps> = ({ initialData }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isScrolled } = useIsScrolled();
  const commandRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebouceQuery(query);
  const pathname = usePathname();
  const { push } = useRouter();
  const {
    data: queryResults,
    refetch,
    isLoading,
    isRefetching,
    isFetching,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!query) return [];
      const { data } = await axios.get(`/api/search?q=${debouncedQuery}`);
      return data.media as aniGQSearchType["media"];
    },
    queryKey: ["search-query"],
    enabled: false,
  });
  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);
  const handleQuery = useCallback((text: string) => {
    setQuery(text);
  }, []);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        push(`/catalog/anime?search=${query}`);
        setOpen(false);
      }
    },
    [query, push]
  );
  const handleDialogClose = useCallback(() => {
    setQuery("");
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  useEffect(() => {
    handleRefetch();
  }, [debouncedQuery, handleRefetch]);
  useOnClickOutside(commandRef, () => {
    setQuery("");
  });
  useEffect(() => {
    setQuery("");
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={`flex justify-start gap-3 h-8 w-full md:w-[250px] ${
            !isScrolled &&
            !pathname!.includes("/catalog") &&
            !pathname!.includes("/about") &&
            !pathname!.includes("/manga") &&
            "bg-[#ffffff] hover:bg-[#f4f4f5] text-zinc-500 hover:text-black"
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="pr-2 text-xs md:text-sm">Search anime...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-0 shadow-none bg-transparent top-[30%] md:top-[40%]">
        <SearchCommand
          className="relative border shadow-md w-full h-full"
          shouldFilter={false}
          ref={commandRef}
        >
          <DialogClose onClick={handleDialogClose} />
          <SearchCommandInput
            placeholder="Type an anime name..."
            autoFocus={true}
            value={query}
            onValueChange={handleQuery}
            className="border-0 focus:ring-0"
            onKeyDown={handleKeyDown}
          />
          <SearchCommandList>
            <SearchCommandGroup
              heading={
                debouncedQuery.length === 0 ? "Recommendation" : "Your search"
              }
            >
              {debouncedQuery.length === 0 ? (
                <>
                  {(initialData?.length ?? 0) > 0 ? (
                    <>
                      {initialData?.map((anime) => (
                        <Link key={anime.id} href={`/anime/${anime.id}`}>
                          <SearchCommandItem
                            className="cursor-pointer"
                            onSelect={handleClose}
                          >
                            <div className="flex justify-center items-center gap-5">
                              <SearchResultAvatar
                                SearchResult={{
                                  title: anime.title,
                                  image: anime.coverImage.extraLarge,
                                }}
                              />
                              <span className="hidden">{anime.id}</span>
                              <div className="flex flex-col gap-2">
                                <span>{anime.title.romaji}</span>
                                <span>
                                  <div className="flex flex-row flex-wrap items-center justify-start gap-3">
                                    {anime.genres.map((genre, i) => (
                                      <Badge key={i} className="text-xs">
                                        {genre}
                                      </Badge>
                                    ))}
                                  </div>
                                </span>
                                <span>
                                  {anime.type}
                                  {anime.episodes === 0
                                    ? ""
                                    : ` . ${anime.status} `}
                                  {anime.episodes > 1
                                    ? `. ${anime.episodes} Episodes`
                                    : anime.episodes === 1
                                    ? `. ${anime.episodes} Episode`
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </SearchCommandItem>
                        </Link>
                      ))}
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {isLoading || isRefetching || isFetching ? (
                    <div className="flex w-full h-full items-center justify-center py-6 gap-2">
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span className="text-xs">Loading, please wait.</span>
                    </div>
                  ) : (
                    <>
                      {(queryResults?.length ?? 0) > 0 ? (
                        <>
                          {queryResults?.map((anime) => (
                            <Link key={anime.id} href={`/anime/${anime.id}`}>
                              <SearchCommandItem
                                className="cursor-pointer"
                                onSelect={handleClose}
                              >
                                <div className="flex justify-center items-center gap-5">
                                  <SearchResultAvatar
                                    SearchResult={{
                                      title: anime.title,
                                      image: anime.coverImage.extraLarge,
                                    }}
                                  />
                                  <span className="hidden">{anime.id}</span>
                                  <div className="flex flex-col gap-2">
                                    <span>{anime.title.romaji}</span>
                                    <span>
                                      <div className="flex flex-row flex-wrap items-center justify-start gap-3">
                                        {anime.genres.map((genre, i) => (
                                          <Badge key={i} className="text-xs">
                                            {genre}
                                          </Badge>
                                        ))}
                                      </div>
                                    </span>
                                    <span>
                                      {anime.type}
                                      {anime.episodes === 0
                                        ? ""
                                        : ` . ${anime.status} `}
                                      {anime.episodes > 1
                                        ? `. ${anime.episodes} Episodes`
                                        : anime.episodes === 1
                                        ? `. ${anime.episodes} Episode`
                                        : ""}
                                    </span>
                                  </div>
                                </div>
                              </SearchCommandItem>
                            </Link>
                          ))}
                        </>
                      ) : null}
                    </>
                  )}
                </>
              )}
              {isFetched && (
                <>
                  {isLoading || isRefetching || isFetching ? (
                    <SearchCommandEmpty className="p-0 m-0"></SearchCommandEmpty>
                  ) : (
                    <SearchCommandEmpty>No anime found.</SearchCommandEmpty>
                  )}
                </>
              )}
            </SearchCommandGroup>
          </SearchCommandList>
          {(queryResults?.length ?? 0) > 0 && (
            <>
              {isLoading || isRefetching || isFetching ? null : (
                <Link
                  href={`/catalog/anime?search=${query}`}
                  className="flex justify-center items-center"
                  onClick={handleClose}
                >
                  <Button variant="link">See more</Button>
                </Link>
              )}
            </>
          )}
        </SearchCommand>
      </DialogContent>
    </Dialog>
  );
};

export default AnimeSearchDialog;
