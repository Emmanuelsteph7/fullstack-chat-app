import { lazy } from "react";
import { Path } from "../../routes";
import { RouteObject } from "react-router-dom";
import AuthLayout from "../../../layouts/authLayout";
import SuspenseFallback from "../../../components/suspenseFallback";

const Login = lazy(() => import("../../../pages/auth/login"));
const Signup = lazy(() => import("../../../pages/auth/signup"));
const ForgotPassword = lazy(() => import("../../../pages/auth/forgotPassword"));

const routesData = [
  {
    path: Path.Login,
    component: <Login />,
  },
  {
    path: Path.Signup,
    component: <Signup />,
  },
  {
    path: Path.ForgotPassword,
    component: <ForgotPassword />,
  },
];

const authRoutesChildren: RouteObject[] = routesData.map((route) => ({
  path: route.path,
  element: (
    <SuspenseFallback path={route.path}>{route.component}</SuspenseFallback>
  ),
}));

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: authRoutesChildren,
  },
];
