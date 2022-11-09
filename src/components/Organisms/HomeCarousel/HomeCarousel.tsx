import { Carousel } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  store,
  useAppDispath,
} from "../../../store/configStore";
import { getListBanner } from "../../../store/quanLyPhim";
import "./HomeCarousel.css";

export const HomeCarousel: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundColor: "#364d79",
  };
  const { listBanner } = useSelector(
    (state: RootState) => state.carouselReducer
  );
  const dispatch = useAppDispath();
  // console.log(getListBanner);
  useEffect(() => {
    dispatch(getListBanner());
  }, []);
  const renderCarousel = () => {
    return listBanner?.map((item) => {
      return (
        <div key={item.maBanner}>
          <div
            style={{
              ...contentStyle,
              background: `url(${item.hinhAnh})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100%",
            }}
          >
            <img
              src={item.hinhAnh}
              alt={item.hinhAnh}
              className="w-full opacity-0"
            />
          </div>
        </div>
      );
    });
  };
  return (
    <Carousel autoplay className="relative z-0">
      {renderCarousel()}
    </Carousel>
  );
};

export default HomeCarousel;
