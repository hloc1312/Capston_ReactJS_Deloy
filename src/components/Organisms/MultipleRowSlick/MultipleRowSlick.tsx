import React, { memo } from "react";
import Slider from "react-slick";
import { Phim } from "../../../types/quanLyPhimTypes";
import CardFilm_Hover from "../../Molecules/CardFilm_Hover/CardFilm_Hover";
import styleSlick from "./MultipleRowSlick.module.css";
import cn from "classnames";
import { useTranslation } from "react-i18next";

type ChilProps = React.HTMLAttributes<HTMLDivElement> & {
  listMovie: Phim[];
  homeMenuRef: any;
  phimSapChieu: () => void;
  phimDangChieu: () => void;
  isShowing?: string;
};

export const MultipleRowSlick: React.FC<ChilProps> = ({
  listMovie,
  phimDangChieu,
  phimSapChieu,
  isShowing,
  homeMenuRef,
}) => {
  const renderPhim = () => {
    return listMovie
      .filter((item) => item.sapChieu.toString() === isShowing)
      .map((item) => {
        return (
          <div key={item.maPhim} className="mt-2">
            {/* <CardFilm phim={item} /> */}
            <CardFilm_Hover phim={item} homeMenuRef={homeMenuRef} />
          </div>
        );
      });
  };
  const { t, i18n } = useTranslation();
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      ></div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block", left: "-50px" }}
        onClick={onClick}
      ></div>
    );
  }

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <button
        className={cn(
          `relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 ${
            isShowing === "false" ? styleSlick["active"] : ""
          }`,
          { active: isShowing === "false" }
        )}
        onClick={phimDangChieu}
      >
        <span
          className={cn(
            `relative px-5 py-2.5 transition-all ease-in duration-75 ${
              isShowing === "false" ? `${styleSlick["active"]}` : "bg-white"
            } dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 uppercase `,
            { active: isShowing === "false" }
          )}
        >
          {t("Now Showing")}
        </span>
      </button>
      <button
        className={cn(
          `relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 ${
            isShowing === "true" ? styleSlick["active"] : ""
          }`,
          { active: isShowing === "true" }
        )}
        onClick={phimSapChieu}
      >
        <span
          className={cn(
            `relative px-5 py-2.5 transition-all ease-in duration-75 ${
              isShowing === "true" ? `${styleSlick["active"]}` : "bg-white"
            } dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 uppercase `,
            { active: isShowing === "true" }
          )}
        >
          {t("Comming Soon")}
        </span>
      </button>
      <Slider {...settings}>{renderPhim()}</Slider>
    </div>
  );
};

export default memo(MultipleRowSlick);
