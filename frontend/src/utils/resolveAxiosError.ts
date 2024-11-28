// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resolveAxiosError = (error: any) => {
  const errMessage =
    error?.response?.data?.errMessage || "Something went wrong!!!";

  return errMessage;
};
