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
const PaymentSuccess = lazy(() => import("@/pages/paymentSuccess"));
const PaymentError = lazy(() => import("@/pages/paymentError"));
const Profile = lazy(() => import("@/pages/profile"));
const EditProfile = lazy(() => import("@/pages/profile/pages/EditProfile"));
const Admin = lazy(() => import("@/pages/admin"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const AboutPage = lazy(() => import("@/pages/about"));
const AdminProduct = lazy(
  () => import("@/pages/admin/pages/adminProduct/AdminProduct")
);
const AddNewProduct = lazy(
  () => import("@/pages/admin/pages/addNewProduct/AddNewProduct")
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
  //! User Side
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
        component: ProductPage,
      },
      {
        name: "ProductDetail",
        path: `${BaseUrl.ProductPage}/:id`,
        component: ProductDetail,
      },
    ],
  },
  {
    name: "Payment Success Layout",
    path: BaseUrl.PaymentSuccess,
    layout: DefaultLayout,
    isPrivateRoute: true,
    routeChild: [
      {
        name: "PaymentSuccess",
        path: BaseUrl.PaymentSuccess,
        component: withCheckRole(PaymentSuccess, [PERMISSION_ENUM.PUBLIC]),
      },
    ],
  },
  {
    name: "Payment Error Layout",
    path: BaseUrl.PaymentError,
    layout: DefaultLayout,
    isPrivateRoute: true,
    routeChild: [
      {
        name: "PaymentError",
        path: BaseUrl.PaymentError,
        component: withCheckRole(PaymentError, [PERMISSION_ENUM.PUBLIC]),
      },
    ],
  },
  {
    name: "Profile Layout",
    path: BaseUrl.Profile,
    layout: DefaultLayout,
    isPrivateRoute: true,
    routeChild: [
      {
        name: "Profile",
        path: BaseUrl.Profile,
        component: withCheckRole(Profile, [PERMISSION_ENUM.PUBLIC]),
      },
      {
        name: "EditProfile",
        path: BaseUrl.EditProfile,
        component: withCheckRole(EditProfile, [PERMISSION_ENUM.PUBLIC]),
      },
    ],
  },
  {
    name: "About Layout",
    path: BaseUrl.About,
    layout: DefaultLayout,
    routeChild: [
      {
        name: "About",
        path: BaseUrl.About,
        component: AboutPage,
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

  //! Admin Side
  {
    name: "Admin Layout",
    path: BaseUrl.Admin,
    layout: AdminLayout,
    isPrivateRoute: true,
    routeChild: [
      {
        name: "Admin",
        path: BaseUrl.Admin,
        component: withCheckRole(Admin, [PERMISSION_ENUM.ADMIN]),
      },
      {
        name: "AdminProduct",
        path: BaseUrl.AdminProduct,
        component: AdminProduct,
      },
      {
        name: "AddNewProduct",
        path: BaseUrl.AddNewProduct,
        component: AddNewProduct,
      },
      {
        name: "EditProduct",
        path: `${BaseUrl.AddNewProduct}/:id`,
        component: AddNewProduct,
      },
    ],
  },
];

export default routes;
