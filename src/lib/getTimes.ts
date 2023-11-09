export function convertSecondsToTime(ms: number) {
  let days = Math.floor(ms / (3600 * 24));
  let hours = Math.floor((ms % (3600 * 24)) / 3600);
  let minutes = Math.floor((ms % 3600) / 60);
  let seconds = Math.floor(ms % 60);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
