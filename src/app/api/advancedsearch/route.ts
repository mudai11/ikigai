import { aniAdvanceSearch } from "@/lib/anilistFetcher";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const sort = url.searchParams.get("sort");
    const genres = url.searchParams.get("genres");
    const format = url.searchParams.get("format");
    const type = url.searchParams.get("type");
    const pageParams = url.searchParams.get("page");
    const data = await aniAdvanceSearch({
      search: search?.length === 0 ? null : search,
      type: type?.length === 0 ? "ANIME" : type,
      genres: genres?.length === 0 ? undefined : [genres!],
      format:
        format?.length === 0
          ? type === "ANIME"
            ? ["TV", "MOVIE", "TV_SHORT", "SPECIAL", "OVA", "ONA", "MUSIC"]
            : ["MANGA", "NOVEL", "ONE_SHOT"]
          : [format!],
      page: Number(pageParams!),
      perPage: 20,
      sort: sort!,
    });

    return new Response(JSON.stringify(data));
  } catch (err) {
    return new Response(
      "Could not search anime at the moment, try again later.",
      {
        status: 500,
      }
    );
  }
}
