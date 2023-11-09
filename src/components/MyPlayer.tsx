"use client";

import * as React from "react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import { skipType } from "@/types/skipType";
import Plyr, { Options } from "plyr";
import { ISubtitle } from "@consumet/extensions";
import ISO6391 from "iso-639-1";

const MyPlayer = ({
  path,
  subtitles,
  autoPlay,
  autoSkip,
  autoNext,
  setNext,
  currEp,
  maxEp,
  skip,
  poster,
}: {
  path: string;
  subtitles: false | ISubtitle[] | undefined;
  autoPlay: boolean;
  autoSkip: boolean;
  autoNext: boolean;
  setNext: (next: number) => void;
  currEp: number;
  maxEp: number;
  skip: skipType[] | undefined;
  poster: string;
}) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const unsupportedRef = React.useRef<HTMLVideoElement>(null);
  const supported = Hls.isSupported();
  const hasQuality = React.useRef<boolean>(false);
  const [sub, setSub] = React.useState<
    | {
        kind: string;
        label: string;
        src: string;
        srcLang: string;
      }[]
    | undefined
  >(undefined);

  React.useEffect(() => {
    hasQuality.current = false;
  }, []);

  React.useEffect(() => {
    if (subtitles) {
      const getSub = subtitles.filter((x) => x.lang !== "Thumbnails");
      const sub: {
        default?: boolean | undefined;
        kind: string;
        label: string;
        src: string;
        srcLang: string;
      }[] = getSub.map((x) => {
        return {
          kind: "captions",
          label: x.lang.split(" ")[0],
          src: x.url,
          srcLang: ISO6391.getCode(x.lang.split(" ")[0]),
        };
      });
      const uniqueLabels: string[] = [];
      const uniqueSubs = sub.filter((x) => {
        const isDuplicate = uniqueLabels.includes(
          x.label.toLocaleLowerCase().split(" ")[0]
        );
        if (!isDuplicate) {
          uniqueLabels.push(x.label.toLocaleLowerCase().split(" ")[0]);

          return true;
        }

        return false;
      });

      setSub(uniqueSubs);
    }
  }, [subtitles]);

  React.useEffect(() => {
    let player: Plyr | null;
    let hls: Hls | null;
    let getThumb: ISubtitle | undefined;

    if (supported) {
      hls = new Hls({
        enableWorker: false,
      });
      hls.loadSource(path);
      if (ref.current) {
        hls.attachMedia(ref.current);
      }

      function initPlayer(markers?: Options["markers"]) {
        if (hls === null) return;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (hasQuality.current) return;
          const levels = hls!.levels;
          const availableQualities = levels.map((level) => level.height);
          const quality: Options["quality"] = {
            default: levels[levels.length - 1].height,
            options: availableQualities,
            forced: true,
            onChange: (newQuality: number) => {
              levels.forEach((level, levelIndex) => {
                if (level.height === newQuality) {
                  hls!.currentLevel = levelIndex;
                }
              });
            },
          };

          if (ref.current === null) return;

          if (subtitles) {
            getThumb = subtitles.find((x) => x.lang === "Thumbnails");

            const previewThumbnails: Options["previewThumbnails"] | undefined =
              getThumb?.url
                ? {
                    enabled: true,
                    src: getThumb.url,
                  }
                : undefined;
            if (markers) {
              player = new Plyr(ref.current, {
                quality,
                markers,
                previewThumbnails,
              });
            } else {
              player = new Plyr(ref.current, {
                quality,
                previewThumbnails,
              });
            }
          } else {
            if (markers) {
              player = new Plyr(ref.current, {
                quality,
                markers,
              });
            } else {
              player = new Plyr(ref.current, {
                quality,
              });
            }
          }

          hasQuality.current = true;
        });
      }

      if (skip) {
        const op = skip.find((item) => item.skipType === "op");
        const ed = skip.find((item) => item.skipType === "ed");

        let markers: Options["markers"] | undefined;

        if (op && ed) {
          markers = {
            enabled: true,
            points: [
              { time: op.interval.startTime, label: "Opening start" },
              { time: op.interval.endTime, label: "Opening end" },
              { time: ed.interval.startTime, label: "Ending start" },
              { time: ed.interval.endTime, label: "Ending end" },
            ],
          };
        } else if (op && !ed) {
          markers = {
            enabled: true,
            points: [
              { time: op.interval.startTime, label: "Opening start" },
              { time: op.interval.endTime, label: "Opening end" },
            ],
          };
        } else if (!op && ed) {
          markers = {
            enabled: true,
            points: [
              { time: ed.interval.startTime, label: "Ending start" },
              { time: ed.interval.endTime, label: "Ending end" },
            ],
          };
        }

        initPlayer(markers);
      } else {
        initPlayer();
      }

      return () => {
        if (hls != null) {
          hls.destroy();
        }
        if (player != null) {
          player.destroy();
        }
      };
    }
  }, [path, ref, skip, subtitles, supported]);

  React.useEffect(() => {
    let _this: HTMLVideoElement | null;
    if (supported) {
      _this = ref.current;
    } else {
      _this = unsupportedRef.current;
    }

    if (!_this || !skip) return;

    const op = skip.find((item) => item.skipType === "op");
    const ed = skip.find((item) => item.skipType === "ed");
    const skipFn = () => {
      const currentTime = _this!.currentTime;
      if (autoSkip) {
        if (op && ed) {
          if (op === undefined || ed === undefined) return;
          if (
            currentTime >= op.interval.startTime &&
            currentTime < op.interval.endTime
          ) {
            _this!.currentTime = op.interval.endTime;
          }
          if (
            currentTime >= ed.interval.startTime &&
            currentTime < ed.interval.endTime
          ) {
            _this!.currentTime = ed.interval.endTime;
          }
        } else if (op && !ed) {
          if (
            currentTime >= op.interval.startTime &&
            currentTime < op.interval.endTime
          ) {
            _this!.currentTime = op.interval.endTime;
          }
        } else if (!op && ed) {
          if (
            currentTime >= ed.interval.startTime &&
            currentTime < ed.interval.endTime
          ) {
            _this!.currentTime = ed.interval.endTime;
          }
        }
      }
    };

    _this.addEventListener("timeupdate", skipFn);

    return () => {
      _this!.removeEventListener("timeupdate", skipFn);
    };
  }, [skip, autoSkip, supported]);

  const next = React.useCallback(() => {
    if (currEp < maxEp) {
      setNext(currEp + 1);
    }
  }, [currEp, maxEp, setNext]);

  React.useEffect(() => {
    let _this: HTMLVideoElement | null;
    if (supported) {
      _this = ref.current;
    } else {
      _this = unsupportedRef.current;
    }

    if (!_this) return;
    _this.addEventListener("ended", next);

    return () => {
      _this!.removeEventListener("ended", next);
    };
  }, [autoNext, currEp, maxEp, next, supported]);

  return (
    <div className="aspect-video">
      {supported ? (
        <video
          autoPlay={autoPlay}
          ref={ref}
          poster={poster}
          crossOrigin="anonymous"
          className="w-full h-full"
        >
          {sub &&
            sub.map((x) => (
              <track
                key={x.label}
                kind={x.kind}
                label={x.label}
                src={x.src}
                default={x.label === "English"}
                srcLang={x.srcLang}
              />
            ))}
        </video>
      ) : (
        <video
          src={path}
          poster={poster}
          autoPlay={autoPlay}
          ref={unsupportedRef}
          controls
          className="w-full h-full"
          crossOrigin="anonymous"
        >
          {sub &&
            sub.map((x) => (
              <track
                key={x.label}
                kind="subtitles"
                label={x.label}
                src={x.src}
                default={x.label === "English"}
                srcLang={x.srcLang}
              />
            ))}
        </video>
      )}
    </div>
  );
};

export default React.memo(MyPlayer);
