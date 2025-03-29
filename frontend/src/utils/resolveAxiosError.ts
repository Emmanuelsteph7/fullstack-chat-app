// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resolveAxiosError = (error: any) => {
  const errMessage =
    error?.response?.data?.errMessage ||
    error?.errMessage ||
    "Something went wrong!!!";

  const status = error?.error?.statusCode;

  return { message: errMessage, status };
};
