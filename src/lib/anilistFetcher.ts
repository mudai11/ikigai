import { GET_MEDIA_INFO } from "@/queries/GET_MEDIA_INFO";
import { GET_MEDIA_REMAINING_TIME } from "@/queries/GET_MEDIA_REMAININGTIME";
import { advance } from "@/queries/GET_SEARCH_RESULTS";
import { aniAdvanceSearchOptions } from "@/types/aniAdvanceSearchOptions";
import { aniGQInfoType } from "@/types/aniGQType";

export const aniAdvanceSearch = async (options: aniAdvanceSearchOptions) => {
  const {
    search = null,
    type = "ANIME",
    genres = null,
    format = null,
    page = 1,
    perPage = null,
    sort = "POPULARITY_DESC",
  } = options;
  const response = await fetch("https://graphql.anilist.co/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: advance,
      variables: {
        search: search,
        type: type,
        genres: genres,
        format: format,
        perPage: perPage,
        sort: sort,
        page: page,
      },
    }),
  });
  const datas = await response.json();
  const data = datas.data.Page;
  return data;
};

export const aniMediaInfo = async (id: string) => {
  const res = await fetch("https://graphql.anilist.co/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_MEDIA_INFO,
      variables: {
        id: id,
      },
    }),
  });
  const json = await res.json();
  const typedJson = json as aniGQInfoType;
  const data = typedJson.data.Media;
  return data;
};

export const aniGetTimeRemaining = async (id: number) => {
  const res = await fetch("https://graphql.anilist.co/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_MEDIA_REMAINING_TIME,
      variables: {
        id: id,
      },
    }),
  });
  const json = await res.json();
  const data = json.data.Media;
  return data;
};
