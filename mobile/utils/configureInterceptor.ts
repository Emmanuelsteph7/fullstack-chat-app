import { AxiosConfig } from "@/config/axios";
import { resolveAxiosError } from "./resolveAxiosError";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";

export const configureInterceptor = () => {
  const responseInterceptor = AxiosConfig.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { message } = resolveAxiosError(error);

      if (message) {
        const { handleErrorToast } = useToastStore.getState();
        handleErrorToast({ description: message });
      }

      return Promise.reject(error.response?.data || error);
    }
  );

  const requestInterceptor = AxiosConfig.interceptors.request.use((request) => {
    const { token } = useAuthStore.getState();

    request.headers.Authorization = `Bearer ${token}`;

    return request;
  });

  return () => {
    AxiosConfig.interceptors.response.eject(responseInterceptor);
    AxiosConfig.interceptors.request.eject(requestInterceptor);
  };
};
