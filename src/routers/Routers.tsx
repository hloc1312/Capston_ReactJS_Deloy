import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AdminTemplate from "../components/Layouts/AdminTemplate/AdminTemplate";
import CheckoutTemplate from "../components/Layouts/CheckoutTemplate/CheckoutTemplate";
import HomeTemplate from "../components/Layouts/HomeTemplate/HomeTemplate";
import UserTemplate from "../components/Layouts/UserTemplate/UserTemplate";
import Checkout from "../pages/Checkout/Checkout";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../pages/Dashboard/Dashboard";
import Detail from "../pages/Detail/Detail";
import AddFilm from "../pages/Films/AddFilm/AddFilm";
import EditFilm from "../pages/Films/EditFilm/EditFilm";
import Films from "../pages/Films/Films";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/login";

import News from "../pages/News/News";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import ShowTime from "../pages/ShowTime/ShowTime";
import Users from "../pages/Users/Users";

const CheckoutTemplateLazy = lazy(
  () => import("../components/Layouts/CheckoutTemplate/CheckoutTemplate")
);

const HomeTemplateLazy = lazy(
  () => import("../components/Layouts/HomeTemplate/HomeTemplate")
);

const UserTemplateLazy = lazy(
  () => import("../components/Layouts/UserTemplate/UserTemplate")
);

const AdminTemplateLazy = lazy(
  () => import("../components/Layouts/AdminTemplate/AdminTemplate")
);

const Routers = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div
              className="example"
              style={{
                margin: "20px 0",
                marginBottom: "20px",
                padding: "30px 50px",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              <Spin />
            </div>
          }
        >
          <HomeTemplateLazy />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to={"home"} />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "news",
          element: <News />,
        },

        {
          path: "detail/:id",
          element: <Detail />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/checkout",
      element: (
        <Suspense
          fallback={
            <div
              className="example"
              style={{
                margin: "20px 0",
                marginBottom: "20px",
                padding: "30px 50px",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              <Spin />
            </div>
          }
        >
          <CheckoutTemplateLazy />
        </Suspense>
      ),
      children: [
        {
          path: ":id",
          element: <Checkout />,
        },
      ],
    },
    {
      path: "/user",
      element: (
        <Suspense
          fallback={
            <div
              className="example"
              style={{
                margin: "20px 0",
                marginBottom: "20px",
                padding: "30px 50px",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              <Spin />
            </div>
          }
        >
          <UserTemplateLazy />
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <Suspense
          fallback={
            <div
              className="example"
              style={{
                margin: "20px 0",
                marginBottom: "20px",
                padding: "30px 50px",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              <Spin />
            </div>
          }
        >
          <AdminTemplateLazy />
        </Suspense>
      ),
      children: [
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "films",
          element: <Films />,
        },
        {
          path: "films/addfilm",
          element: <AddFilm />,
        },
        {
          path: "films/editfilm/:id",
          element: <EditFilm />,
        },
        {
          path: "films/showtimes/:id",
          element: <ShowTime />,
        },
      ],
    },
  ]);
  return routing;
};

export default Routers;
