import React from "react";
import { Phim } from "../../types/quanLyPhimTypes";
import noImages from "../../assets/noImages.jpg";
type ChilProps = React.HTMLAttributes<HTMLDivElement> & {
  phim: Phim;
};

const CardFilm: React.FC<ChilProps> = ({ phim }) => {
  return (
    <div className="h-full mr-2 bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
      <div
        style={{
          background: `url(${phim.hinhAnh}) no-repeat center / 100%, url(${noImages}) no-repeat center/ 100% `,
        }}
      >
        <img
          className="w-full h-[300px] opacity-0"
          src={phim.hinhAnh}
          alt={phim.tenPhim}
        />
      </div>
      <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 h-16">
        {phim.tenPhim}
      </h1>
      <p className="leading-relaxed mb-3 h-16">
        {phim.moTa.length ? (
          <span>{phim.moTa.slice(0, 100)} ...</span>
        ) : (
          <span>{phim.moTa}</span>
        )}
      </p>
      <a className="text-indigo-500 inline-flex items-center uppercase">
        đặt vé
        <svg
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
};

export default CardFilm;
