import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import noImages from "../../../assets/images/noImages.jpg";
import { RootState, useAppDispath } from "../../../store/configStore";
import { scrollHomeMenuAction } from "../../../store/scrollHomeMenu";
import { Phim } from "../../../types/quanLyPhimTypes";
import ModalTrailerFilm from "../../Organisms/ModalTrailerFilm/ModalTrailerFilm";
import "./CardFlim_Hover.css";

type ChilProps = React.HTMLAttributes<HTMLDivElement> & {
  phim: Phim;
  homeMenuRef: any;
};
const CardFilm_Hover: React.FC<ChilProps> = ({ phim, homeMenuRef }) => {
  const navigate = useNavigate();

  return (
    <div className="cardFilmHover mx-[8px]">
      <img src={phim ? phim.hinhAnh : noImages} alt={phim.tenPhim} />
      <div className="descriptions flex flex-col justify-between">
        <h1>{phim.tenPhim}</h1>
        <p>
          {phim.moTa.length > 200 ? (
            <span>{phim.moTa.slice(0, 200)}...</span>
          ) : (
            <span>{phim.moTa}</span>
          )}
        </p>
        <ModalTrailerFilm phimTrailer={phim} />
        <div className="flex justify-between">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-sm capitalize text-sm px-[10px] py-[10px] text-center "
            onClick={() => navigate(`/detail/${phim.maPhim}`)}
          >
            xem chi tiết
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-sm capitalize text-sm px-[10px] py-[10px]  text-center"
            onClick={() =>
              homeMenuRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              })
            }
          >
            đặt vé
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFilm_Hover;
