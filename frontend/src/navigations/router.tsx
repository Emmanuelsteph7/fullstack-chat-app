import { createBrowserRouter } from "react-router-dom";
import { Path } from "./routes";
import { lazy } from "react";
import GlobalLayout from "../layouts/globalLayout";
import { authRoutes } from "./subRoutes/auth";
import { protectedRoutes } from "./subRoutes/protected";

const Home = lazy(() => import("../pages/home"));
const Settings = lazy(() => import("../pages/settings"));

export const router = createBrowserRouter([
  {
    path: Path.Home,
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: Path.Settings,
        element: <Settings />,
      },
      ...authRoutes,
      ...protectedRoutes,
    ],
  },
]);
