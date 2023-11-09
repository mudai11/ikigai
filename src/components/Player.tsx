"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2, Search } from "lucide-react";
import { Input } from "./ui/input";
import { skipType } from "@/types/skipType";
import MyPlayer from "./MyPlayer";
import PlayerOptionsSwitch from "./PlayerOptionsSwitch";
import { IAnimeEpisode, ISource } from "@consumet/extensions";
import CountdownTimer from "./CountdownTimer";

type PlayerProps = {
  idMal: number;
  id: number;
  image: string;
  next: number | undefined;
};

const providers = ["gogoanime", "enime"];

type TProviders = "gogoanime" | "enime";

const Player: FC<PlayerProps> = ({ id, idMal, image, next }) => {
  const [episodeNumber, setEpisodeNumber] = useState<number>(1);
  const [selectedProvider, setSelectedProvider] =
    useState<TProviders>("gogoanime");
  const [filterNumber, setFilterNumber] = useState<string>("");
  const savedAutoSkip = localStorage.getItem("autoSkip");
  const savedAutoPlay = localStorage.getItem("autoPlay");
  const savedAutoNext = localStorage.getItem("autoNext");
  const [autoPlay, setAutoPlay] = useState<boolean>(
    savedAutoPlay === "true" || false
  );
  const [autoSkip, setAutoSkip] = useState<boolean>(
    savedAutoSkip === "true" || false
  );
  const [autoNext, setAutoNext] = useState<boolean>(
    savedAutoNext === "true" || false
  );
  const {
    data: episodes,
    isLoading: isLoadingEpisodes,
    refetch: refetchEpisodes,
    isRefetching: isRefetchingEpisodes,
    isError: isEpisodesError,
    error: episodeError,
  } = useQuery<IAnimeEpisode[], Error>({
    queryKey: ["episodes-query"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/episodes?id=${id}&provider=${selectedProvider}`
      );
      const episodes = data as IAnimeEpisode[];
      if (episodes.length === 0) return [];
      if (episodes[0].number > 1) return episodes.reverse();
      return episodes;
    },
    enabled: !!selectedProvider,
    retry: false,
  });
  const {
    data: stream,
    isLoading: isLoadingStream,
    mutate: getStream,
    isError: isErrorStream,
    reset: resetStream,
  } = useMutation({
    mutationKey: ["stream-query"],
    mutationFn: async (episodeId: string) => {
      const { data } = await axios.get(
        `/api/watch?id=${episodeId}&provider=${selectedProvider}`
      );
      const source = data as ISource;
      const url = source.sources.find(
        (url) => url.quality === "default" || url.quality === "auto"
      );
      if (!url) return;
      return { url: url.url, subtitles: source.subtitles };
    },
  });
  const {
    data: skip,
    mutate: getSkip,
    reset: resetSkip,
    isLoading: isLoadingSkip,
  } = useMutation({
    mutationKey: ["stream-query"],
    mutationFn: async (episode: number) => {
      const { data } = await axios.get(
        `/api/skip?id=${idMal}&episode=${episode}`
      );
      const skip = data as skipType[];
      return skip;
    },
  });
  const handleProviderChange = useCallback((value: TProviders) => {
    setSelectedProvider(value);
  }, []);
  const handleFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilterNumber(event.target.value);
  }, []);
  const handleNext = useCallback((next: number) => {
    setEpisodeNumber(next);
  }, []);
  const handleEpisode = (number: number) => {
    setEpisodeNumber(number);
  };
  const handleLocalStorage = (
    label: string,
    state: boolean,
    setState: (state: boolean) => void
  ) => {
    localStorage.setItem(label, String(!state));
    setState(!state);
  };

  useEffect(() => {
    refetchEpisodes();
    resetStream();
    resetSkip();
  }, [refetchEpisodes, resetSkip, resetStream, selectedProvider]);
  useEffect(() => {
    if (episodes && episodes.length > 0) {
      getStream(episodes[episodeNumber - 1].id);
      getSkip(episodeNumber);
    }
  }, [episodes, episodeNumber, getStream, getSkip]);

  return (
    <>
      <section className="w-[90%] xl:w-[75%] z-30 flex flex-col gap-5 ">
        <div className="w-full flex flex-col xs:flex-row gap-5 justify-between items-center">
          <h2 className="p-3 lg:p-0 text-[20px] lg:text-2xl font-bold">
            Watch
          </h2>
          <div className="flex flex-col xs:flex-row gap-5 items-center justify-center">
            <p>Provider:</p>
            <Select
              onValueChange={handleProviderChange}
              defaultValue={selectedProvider}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider, i) => (
                  <SelectItem key={i} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      <div className="2xl:w-[1280px] mb-3">
        <div className="flex flex-col-reverse 2xl:flex-row border">
          {isLoadingEpisodes || isRefetchingEpisodes ? (
            <div className="h-[448px] w-[90vw] xl:h-[768px] 2xl:w-[400px] flex flex-col justify-center items-center overflow-y-scroll border-r scrollbar-w-5 scrollbar-thumb-white">
              <Loader2 className="w-8 h-8  animate-spin" />
            </div>
          ) : (
            <>
              {isEpisodesError ? (
                <div className="h-[448px] w-[90vw] xl:h-[768px] 2xl:w-[400px] flex flex-col justify-center items-center overflow-y-scroll border-r scrollbar-w-5 scrollbar-thumb-white">
                  <Loader2 className="w-8 h-8  animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col w-[90vw] 2xl:w-[400px]">
                  <div className="flex flex-row w-full items-center px-2 overflow-hidden border-b border-r border-t 2xl:border-t-0 outline-none">
                    <Search className="w-5 h-5" />
                    <Input
                      value={filterNumber}
                      placeholder="Number of episode..."
                      className="border-none outline-none focus:border-none focus-visible:ring-0 disabled:opacity-50 pr-14 block py-1.5 focus:ring-0 text-sm sm:leading-6"
                      onChange={handleFilter}
                    />
                  </div>
                  <div className="flex flex-col h-[408px] xl:h-[728px] border-r scrollbar-w-5 scrollbar-thumb-white overflow-y-scroll xl:overflow-y-auto">
                    {episodes
                      .filter((episode) => {
                        if (filterNumber === "") return episode;
                        if (!filterNumber.match(/^[0-9]+$/)) return episode;
                        if (episode.number === Number(filterNumber))
                          return episode;
                      })
                      .map((episode) => (
                        <div
                          key={episode.id}
                          className={`flex flex-col cursor-pointer border-b ${
                            filterNumber != "" && filterNumber.match(/^[0-9]+$/)
                              ? ""
                              : episodes.length < 9 && episodes.length > 5
                              ? "border-r xl:border-r-0"
                              : episodes.length > 9 && "border-r"
                          } text-xs py-5 hover:bg-zinc-600 ${
                            episodeNumber === episode.number && "bg-zinc-600"
                          }`}
                          onClick={() => handleEpisode(episode.number)}
                        >
                          <span className="px-5 flex flex-col justify-center h-10">
                            <p className="line-clamp-2">
                              {episode.title != undefined
                                ? `Ep ${episode.number} : ${episode.title}`
                                : `Episode ${episode.number}`}
                            </p>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
          <div className="w-[90vw]">
            {isLoadingEpisodes ||
            isLoadingStream ||
            isRefetchingEpisodes ||
            isLoadingSkip ? (
              <div className="bg-black aspect-video flex justify-center items-center">
                <Loader2 className="w-8 h-8  animate-spin" />
              </div>
            ) : (
              <>
                {isEpisodesError ? (
                  <>
                    {episodeError instanceof AxiosError ? (
                      <div className="bg-black aspect-video flex justify-center items-center">
                        {episodeError.response?.data}
                      </div>
                    ) : (
                      <div className="bg-black aspect-video flex justify-center items-center">
                        An error has occured, please try again later!
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {episodes.length === 0 ? (
                      <div className="bg-black aspect-video flex justify-center items-center">
                        <span>
                          There are no episodes for this anime provided by{" "}
                          {selectedProvider} at the moment, try again later or
                          change the provider!
                        </span>
                      </div>
                    ) : (
                      <>
                        {isErrorStream ? (
                          <div className="bg-black aspect-video flex justify-center items-center">
                            <span>
                              Could not get anime stream using{" "}
                              {selectedProvider} at the moment, try again later
                              or change the provider!
                            </span>
                          </div>
                        ) : (
                          <>
                            {stream && !isLoadingSkip ? (
                              <MyPlayer
                                path={stream.url}
                                subtitles={stream.subtitles}
                                autoPlay={autoPlay}
                                autoSkip={autoSkip}
                                autoNext={autoNext}
                                setNext={handleNext}
                                currEp={episodeNumber}
                                maxEp={episodes.length}
                                skip={skip}
                                poster={image}
                              />
                            ) : (
                              <div className="bg-black aspect-video flex justify-center items-center">
                                <Loader2 className="w-8 h-8  animate-spin" />
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            <section className="flex flex-col gap-5 mt-5">
              <div className="flex flex-row px-5 items-center gap-5 text-xs sm:text-base">
                <h3 className="hidden md:block">Additional options:</h3>
                <PlayerOptionsSwitch
                  label="Auto Play"
                  trigger={autoPlay}
                  onClick={() => {
                    handleLocalStorage("autoPlay", autoPlay, setAutoPlay);
                  }}
                />
                {skip ? (
                  <PlayerOptionsSwitch
                    label="Auto Skip"
                    trigger={autoSkip}
                    onClick={() => {
                      handleLocalStorage("autoSkip", autoSkip, setAutoSkip);
                    }}
                  />
                ) : (
                  <PlayerOptionsSwitch
                    label="Auto Skip"
                    trigger={autoSkip}
                    disabled={true}
                  />
                )}
                <PlayerOptionsSwitch
                  label="Auto Next"
                  trigger={autoNext}
                  disabled={episodeNumber === episodes?.length}
                  onClick={() => {
                    if (episodeNumber === episodes?.length) return;
                    handleLocalStorage("autoNext", autoNext, setAutoNext);
                  }}
                />
              </div>
              {next && (
                <div className="flex flex-row px-5 items-center sm:gap-2 text-xs sm:text-base">
                  <h3>Next episode in:</h3>
                  <CountdownTimer id={id} />
                </div>
              )}
              {episodes &&
                episodes.length > 0 &&
                !isRefetchingEpisodes &&
                !episodeError && (
                  <div className="flex flex-row px-5 items-center gap-1 sm:gap-2 text-xs sm:text-base pb-5">
                    <h3>You&apos;re currently watching</h3>
                    <p>
                      <strong>Episode {episodeNumber}:</strong>{" "}
                      {episodes[episodeNumber - 1].title}{" "}
                      {episodes[episodeNumber - 1].isFiller && (
                        <span>(Filler)</span>
                      )}
                    </p>
                  </div>
                )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Player);
