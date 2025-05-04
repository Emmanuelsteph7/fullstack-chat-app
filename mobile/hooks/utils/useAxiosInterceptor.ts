import { useEffect } from "react";
import { configureInterceptor } from "@/utils/configureInterceptor";

const useAxiosInterceptor = () => {
  useEffect(() => {
    configureInterceptor();
  }, []);
};

export default useAxiosInterceptor;
