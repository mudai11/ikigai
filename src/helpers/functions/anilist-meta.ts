import { META, PROVIDERS_LIST } from "@consumet/extensions";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";

export const generateAnilistMeta = (
  provider: string | undefined = undefined
): Anilist => {
  if (provider) {
    let possibleProvider = PROVIDERS_LIST.ANIME.find(
      (p) => p.name.toLowerCase() === provider.toLocaleLowerCase()
    );
    return new META.Anilist(possibleProvider, {
      url: process.env.PROXY as string | string[],
    });
  } else {
    return new Anilist(undefined, {
      url: process.env.PROXY as string | string[],
    });
  }
};
