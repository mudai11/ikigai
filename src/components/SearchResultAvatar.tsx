"use client";

import { FC, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import { aniGQSearchItemType } from "@/types/aniGQSearchItemType";
import { Skeleton } from "./ui/skeleton";

interface SearchResultAvatarProps extends AvatarProps {
  SearchResult: {
    title: aniGQSearchItemType["title"];
    image: aniGQSearchItemType["coverImage"]["extraLarge"];
  };
}

const SearchResultAvatar: FC<SearchResultAvatarProps> = ({
  SearchResult,
  ...props
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Avatar {...props} className="w-20 h-20">
      {SearchResult.image ? (
        <div className="relative aspect-square h-full w-full">
          {isLoading ? (
            <Skeleton className="w-full h-full absolute z-10 bg-zinc-600" />
          ) : null}
          <Image
            src={SearchResult.image}
            alt={SearchResult.title.romaji + " image"}
            fill
            sizes="100%"
            referrerPolicy="no-referrer"
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      ) : (
        <AvatarFallback>
          <Loader2 className="h-8 w-8 animate-spin" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default SearchResultAvatar;
