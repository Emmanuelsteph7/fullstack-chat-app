import { AxiosConfig } from "../config/axiosConfig";
import { TOKEN_KEY } from "../constants";

export const configureInterceptor = (handleLogout: () => void) => {
  const responseInterceptor = AxiosConfig.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response?.status;

      if (status === 401) {
        handleLogout();
      }

      return Promise.reject(error.response?.data || error);
    }
  );

  const requestInterceptor = AxiosConfig.interceptors.request.use((request) => {
    const token = localStorage.getItem(TOKEN_KEY) || "";

    request.headers.Authorization = `Bearer ${token}`;

    return request;
  });

  return () => {
    AxiosConfig.interceptors.response.eject(responseInterceptor);
    AxiosConfig.interceptors.request.eject(requestInterceptor);
  };
};
