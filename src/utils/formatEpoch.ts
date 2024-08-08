export const formatEpoch = (epoch: number) => {
  const date = new Date(epoch);
  const shortDateTime = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
  return shortDateTime;
};
