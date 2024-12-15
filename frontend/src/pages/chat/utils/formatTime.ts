export const formatTime = (val: Date | string) => {
  const date = new Date(val);
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time;
};
