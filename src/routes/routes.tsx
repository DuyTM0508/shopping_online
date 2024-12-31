import React, { Fragment, lazy } from "react";
import BaseUrl from "@/consts/baseUrl";
import withCheckRole from "@/HOCs/withCheckRole";
import { PERMISSION_ENUM } from "@/consts/common";

// Bash importHere
const DefaultLayout = lazy(() => import("@/layouts/DefaultLayout"));
const Login = lazy(() => import("@/pages/Login"));
const LandingPage = lazy(() => import("@/pages/landingPage/LandingPage"));
const ProductPage = lazy(() => import("@/pages/productPage/ProductPage"));
interface Route {
  name: string;
  path: string;
  isPrivateRoute?: boolean;
  layout:
    | React.LazyExoticComponent<React.MemoExoticComponent<any>>
    | React.ExoticComponent<any>
    | typeof React.Component;
  routeChild: {
    name: string;
    path: string;
    component: typeof React.Component | React.FC;
    isPrivateRoute?: boolean;
  }[];
}

const routes: Route[] = [
  {
    name: "Landing Layout",
    path: BaseUrl.LandingPage,
    layout: DefaultLayout,
    isPrivateRoute: false,
    routeChild: [
      // Bash appendHere
      {
        name: "LandingPage",
        path: BaseUrl.LandingPage,
        component: LandingPage,
      },
    ],
  },
  {
    name: "Product Layout",
    path: BaseUrl.ProductPage,
    layout: DefaultLayout,
    isPrivateRoute: false,
    routeChild: [
      // Bash appendHere
      {
        name: "ProductPage",
        path: BaseUrl.ProductPage,
        component: withCheckRole(ProductPage, [PERMISSION_ENUM.PUBLIC]),
      },
    ],
  },
  {
    name: "Login Layout",
    path: BaseUrl.Login,
    layout: Fragment,
    routeChild: [
      {
        name: "Login",
        path: BaseUrl.Login,
        component: Login,
      },
    ],
  },
];

export default routes;
