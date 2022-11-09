import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, HomeCarousel } from "../../Organisms";

const HomeTemplate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="HomeTemplate">
      <Header />
      <div className="HomeTemplate-content ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeTemplate;
