import { RouterProvider } from "react-router-dom";
import { router } from "./navigations/router";
import { useThemeStore } from "./store/useThemeStore";
import { configureInterceptor } from "./utils/configureInterceptor";
import { useAuthStore } from "./store/useAuthStore";
import { useSoundStore } from "./store/useSoundStore";

const App = () => {
  const { theme } = useThemeStore();
  const { logout } = useAuthStore();
  const { handlePlayInitial } = useSoundStore();

  configureInterceptor(() => logout());

  return (
    <div data-theme={theme} onClick={handlePlayInitial} className="bg-base-100">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
