// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeArrays = (oldArray: any[], newArray: any[], id: string) => {
  const mergedMap = new Map(oldArray.map((obj) => [obj[id], obj]));

  // Spread newArray over oldArray, replacing values for existing IDs
  newArray.forEach((obj) => {
    mergedMap.set(obj[id], { ...mergedMap.get(obj[id]), ...obj });
  });

  return Array.from(mergedMap.values());
};
