"use client";

import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Combobox } from "./Combobox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

const sortOptions = [
  { value: "POPULARITY_DESC", label: "Popularity" },
  { value: "TRENDING_DESC", label: "Trending" },
  { value: "FAVOURITES_DESC", label: "Favorites" },
  { value: "SCORE_DESC", label: "Average Score" },
  { value: "TITLE_ROMAJI_DESC", label: "Title Z-A" },
  { value: "TITLE_ROMAJI", label: "Title A-Z" },
];
const genres = [
  { value: "Action", label: "Action" },
  { value: "Adventure", label: "Adventure" },
  { value: "Comedy", label: "Comedy" },
  { value: "Drama", label: "Drama" },
  { value: "Ecchi", label: "Ecchi" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Horror", label: "Horror" },
  { value: "Mahou Shoujo", label: "Mahou Shoujo" },
  { value: "Mecha", label: "Mecha" },
  { value: "Music", label: "Music" },
  { value: "Mystery", label: "Mystery" },
  { value: "Psychological", label: "Psychological" },
  { value: "Romance", label: "Romance" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Slice of Life", label: "Slice of Life" },
  { value: "Sports", label: "Sports" },
  { value: "Supernatural", label: "Supernatural" },
  { value: "Thriller", label: "Thriller" },
];

const formatAnime = [
  { value: "TV", label: "TV Show" },
  { value: "MOVIE", label: "Movie" },
  { value: "TV_SHORT", label: "TV Short" },
  { value: "SPECIAL", label: "Special" },
  { value: "OVA", label: "OVA" },
  { value: "ONA", label: "ONA" },
  { value: "MUSIC", label: "Music" },
];

const formatManga = [
  { value: "MANGA", label: "Manga" },
  { value: "NOVEL", label: "Light Novel" },
  { value: "ONE_SHOT", label: "One Shot" },
];

const SearchAndFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const current = new URLSearchParams(Array.from(searchParams!.entries()));
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!search) {
          current.delete("search");
        } else {
          current.set("search", search);
        }
        const string = current.toString();
        const query = search ? `?${string}` : "";
        router.push(`${pathname}${query}`);
      }
    },
    [pathname, router, search, searchParams]
  );
  useEffect(() => {
    const search = searchParams!.get("search");
    if (search) {
      setSearch(search);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-row px-2 items-center justify-around md:justify-center gap-3">
      <div className="flex flex-col justify-center  gap-2">
        <h2 className="text-lg md:text-2xl font-bold">Search</h2>
        <Input
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search by title..."
        />
      </div>
      <div className="hidden md:flex flex-col justify-center  gap-2">
        <h2 className="text-lg md:text-2xl font-bold">Sort</h2>
        <Combobox items={sortOptions} title={"Sort by"} params={"sort"} />
      </div>
      <div className="hidden md:flex  flex-col justify-center  gap-2">
        <h2 className="text-lg md:text-2xl font-bold">Genre</h2>
        <Combobox items={genres} title={"Select a genre"} params={"genres"} />
      </div>
      <div className="hidden md:flex  flex-col justify-center  gap-2">
        <h2 className="text-lg md:text-2xl font-bold">Format</h2>
        <Combobox
          items={
            pathname!.substring(pathname!.lastIndexOf("/") + 1) === "anime"
              ? formatAnime
              : formatManga
          }
          title={"Select a format"}
          params={"format"}
        />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="md:hidden mt-auto flex flex-row gap-2 items-center"
          >
            Filters
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[280px] top-[21%] flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>Apply filters</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Combobox items={sortOptions} title={"Sort by"} params={"sort"} />
            <Combobox
              items={genres}
              title={"Select a genre"}
              params={"genres"}
            />
            <Combobox
              items={
                pathname!.substring(pathname!.lastIndexOf("/") + 1) === "anime"
                  ? formatAnime
                  : formatManga
              }
              title={"Select a format"}
              params={"format"}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchAndFilter;
