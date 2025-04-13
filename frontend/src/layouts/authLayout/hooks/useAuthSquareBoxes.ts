import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Path } from "../../../navigations/routes";

const useAuthSquareBoxes = () => {
  const { pathname } = useLocation();

  const { paragraph, title } = useMemo(() => {
    if (pathname.includes(Path.Signup)) {
      return {
        title: "Join our community",
        paragraph:
          "Connect with friends, share moments and stay in touch with your loved ones.",
      };
    }

    return {
      title: "Welcome back!",
      paragraph:
        "Sign in to continue your conversations and catch up with your messages",
    };
  }, [pathname]);

  return { paragraph, title };
};

export default useAuthSquareBoxes;
