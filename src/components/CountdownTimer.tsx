"use client";

import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { aniGetTimeRemaining } from "@/lib/anilistFetcher";

interface CountdownTimerProps {
  id: number;
}

const CountdownTimer: FC<CountdownTimerProps> = ({ id }) => {
  const [time, setTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const convertSecondsToTime = useMemo(() => {
    let days = Math.floor(time / (3600 * 24));
    let hours = Math.floor((time % (3600 * 24)) / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }, [time]);

  useEffect(() => {
    const getTime = async () => {
      const data = await aniGetTimeRemaining(id);
      const time = data.nextAiringEpisode.timeUntilAiring;
      setTime(time);
    };
    getTime();
  }, [id]);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, []);

  useEffect(() => {
    setRemainingTime(convertSecondsToTime);
  }, [convertSecondsToTime]);

  return (
    <>
      {time > 0 && (
        <div className="flex flex-row gap-1 w-[150px] justify-center items-center sm:px-2">
          <span>{remainingTime.days}d</span>
          <span>{remainingTime.hours}h</span>
          <span>{remainingTime.minutes}m</span>
          <span>{remainingTime.seconds}s</span>
        </div>
      )}
    </>
  );
};

export default memo(CountdownTimer);
