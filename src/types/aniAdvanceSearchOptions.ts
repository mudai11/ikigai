export type aniAdvanceSearchOptions = {
  search: string | null;
  type: string | null;
  genres: string[] | undefined;
  format: string[] | undefined;
  page: number;
  perPage: number;
  sort: string;
};
