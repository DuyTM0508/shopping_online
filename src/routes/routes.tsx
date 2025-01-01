import React, { Fragment, lazy } from "react";
import BaseUrl from "@/consts/baseUrl";
import withCheckRole from "@/HOCs/withCheckRole";
import { PERMISSION_ENUM } from "@/consts/common";

// Bash importHere
const DefaultLayout = lazy(() => import("@/layouts/DefaultLayout"));
const Login = lazy(() => import("@/pages/Login"));
const LandingPage = lazy(() => import("@/pages/landingPage"));
const ProductPage = lazy(() => import("@/pages/productPage"));
const HomePage = lazy(() => import("@/pages/homePage"));
const ProductDetail = lazy(
  () => import("@/pages/productPage/pages/DetailProduct")
);
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
    name: "Home Layout",
    path: BaseUrl.HomePage,
    layout: DefaultLayout,
    routeChild: [
      // Bash appendHere
      {
        name: "HomePage",
        path: BaseUrl.HomePage,
        component: HomePage,
      },
    ],
  },
  {
    name: "Landing Layout",
    path: BaseUrl.LandingPage,
    layout: DefaultLayout,
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
    routeChild: [
      // Bash appendHere
      {
        name: "ProductPage",
        path: BaseUrl.ProductPage,
        component: withCheckRole(ProductPage, [PERMISSION_ENUM.PUBLIC]),
      },
      {
        name: "ProductDetail",
        path: `${BaseUrl.ProductPage}/:id`,
        component: withCheckRole(ProductDetail, [PERMISSION_ENUM.USER]),
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
