import { RouterProvider } from "react-router-dom";
import { router } from "./navigations/router";
import { useThemeStore } from "./store/useThemeStore";
import { configureInterceptor } from "./utils/configureInterceptor";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { theme } = useThemeStore();
  const { logout, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  configureInterceptor(() => logout());

  return (
    <div data-theme={theme} className="bg-base-100">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
