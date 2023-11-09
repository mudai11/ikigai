import { advance } from "@/queries/GET_SEARCH_RESULTS";
import { aniGQSearchType } from "@/types/aniGQSearchType";

export const getTrendingAnimes = async () => {
  try {
    const response = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: advance,
        variables: {
          search: null,
          type: "ANIME",
          genres: undefined,
          format: ["TV", "MOVIE", "TV_SHORT", "SPECIAL", "OVA", "ONA", "MUSIC"],
          page: 1,
          perPage: 10,
          sort: "TRENDING_DESC",
        },
      }),
    });
    const datas = await response.json();
    const data = datas.data.Page;
    const trendingAnimes = data as aniGQSearchType;
    return trendingAnimes.media;
  } catch (err) {
    console.log(err);
  }
};

export const getHighestScoredAnimes = async () => {
  try {
    const response = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: advance,
        variables: {
          search: null,
          type: "ANIME",
          genres: undefined,
          format: ["TV", "MOVIE", "TV_SHORT", "SPECIAL", "OVA", "ONA", "MUSIC"],
          page: 1,
          perPage: 5,
          sort: "SCORE_DESC",
        },
      }),
    });
    const datas = await response.json();
    const data = datas.data.Page;
    const highestScored = data as aniGQSearchType;
    return highestScored.media;
  } catch (err) {
    console.log(err);
  }
};

export const getMostFavoritedAnimes = async () => {
  try {
    const response = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: advance,
        variables: {
          search: null,
          type: "ANIME",
          genres: undefined,
          format: ["TV", "MOVIE", "TV_SHORT", "SPECIAL", "OVA", "ONA", "MUSIC"],
          page: 1,
          perPage: 5,
          sort: "FAVOURITES_DESC",
        },
      }),
    });
    const datas = await response.json();
    const data = datas.data.Page;
    const mostFavorited = data as aniGQSearchType;
    return mostFavorited.media;
  } catch (err) {
    console.log(err);
  }
};

export const getPopularAnimes = async () => {
  try {
    const response = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: advance,
        variables: {
          search: null,
          type: "ANIME",
          genres: undefined,
          format: ["TV", "MOVIE", "TV_SHORT", "SPECIAL", "OVA", "ONA", "MUSIC"],
          page: 1,
          perPage: 5,
          sort: "POPULARITY_DESC",
        },
      }),
    });
    const datas = await response.json();
    const data = datas.data.Page;
    const popular = data as aniGQSearchType;
    return popular.media;
  } catch (err) {
    console.log(err);
  }
};
