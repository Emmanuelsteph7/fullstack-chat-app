import { lazy } from "react";
import { Path } from "../../routes";
import SuspenseFallback from "../../../components/suspenseFallback";
import { RouteObject } from "react-router-dom";
import ProtectedLayout from "../../../layouts/protectedLayout";

const Profile = lazy(() => import("../../../pages/protected/profile"));
const Chat = lazy(() => import("../../../pages/protected/chat"));

const routesData = [
  {
    path: Path.Profile,
    component: <Profile />,
  },
  {
    path: Path.Chat,
    component: <Chat />,
  },
];

const protectedRoutesChildren: RouteObject[] = routesData.map((route) => ({
  path: route.path,
  element: (
    <SuspenseFallback path={route.path}>{route.component}</SuspenseFallback>
  ),
}));

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: protectedRoutesChildren,
  },
];
