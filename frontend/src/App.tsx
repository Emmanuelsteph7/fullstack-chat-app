import { RouterProvider } from "react-router-dom";
import { router } from "./navigations/router";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme} className="bg-base-100">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
