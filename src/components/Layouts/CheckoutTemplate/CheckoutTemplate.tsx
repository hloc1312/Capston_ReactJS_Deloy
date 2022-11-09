import React, { useEffect } from "react";
import { Navigate, Outlet, redirect, useLocation } from "react-router-dom";
import { USER_LOGIN } from "../../../utils/config";

const CheckoutTemplate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!localStorage.getItem("USER_LOGIN")) {
    return <Navigate to={"/user/login"} />;
  }
  return <Outlet />;
};

export default CheckoutTemplate;
