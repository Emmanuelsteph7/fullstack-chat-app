/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { Path } from "./routes";
import { lazy } from "react";
import GlobalLayout from "../layouts/globalLayout";
import AuthLayout from "../layouts/authLayout";
import ProtectedLayout from "../layouts/protectedLayout";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Profile = lazy(() => import("../pages/profile"));
const Settings = lazy(() => import("../pages/settings"));
const Signup = lazy(() => import("../pages/signup"));
const Chat = lazy(() => import("../pages/chat"));

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
      {
        path: Path.Home,
        element: <AuthLayout />,
        children: [
          {
            path: Path.Login,
            element: <Login />,
          },
          {
            path: Path.Signup,
            element: <Signup />,
          },
        ],
      },
      {
        path: Path.Home,
        element: <ProtectedLayout />,
        children: [
          {
            path: Path.Chat,
            element: <Chat />,
          },
          {
            path: Path.Profile,
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
