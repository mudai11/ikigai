export type aniGQInfoType = {
  data: {
    Media: {
      idMal: number;
      id: number;
      type: string;
      title: { romaji: string; english: string; native: string };
      coverImage: {
        extraLarge: string;
        large: string;
        color: string;
      };
      bannerImage: string;
      description: string;
      episodes: number;
      nextAiringEpisode?: {
        episode: number;
        airingAt: number;
        timeUntilAiring: number;
      };
      averageScore: number;
      popularity: number;
      status: string;
      startDate: { year: number };
      duration: number;
      studios: {
        nodes: { name: string }[];
      };
      genres: string[];
      relations: {
        edges: {
          relationType: string;
          node: {
            id: number;
            type: string;
            status: string;
            title: {
              romaji: string;
              english: string;
              userPreferred: string;
            };
            coverImage: {
              extraLarge: string;
              large: string;
              color: string;
            };
          };
        }[];
      };
      recommendations: {
        nodes: {
          mediaRecommendation: {
            id: number;
            title: { romaji: string };
            coverImage: {
              extraLarge: string;
              large: string;
            };
            episodes: number;
            status: string;
            format: string;
            description: string;
            genres: string[];
          };
        }[];
      };
    };
  };
};
