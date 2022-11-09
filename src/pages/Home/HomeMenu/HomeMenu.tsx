import React, { Fragment, memo } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space, Tabs } from "antd";
import { useState } from "react";
import { LichChieuHeThongRap } from "../../../types/quanLyRapType";
import { NavLink } from "react-router-dom";
import moment from "moment";
import noImages from "../../../assets/images/noImages.jpg";

type ChilProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  heThongRapChieu: LichChieuHeThongRap[];
  homeMenuRef?: any;
};

type TabPosition = "left" | "right" | "top" | "bottom";
const HomeMenu: React.FC<ChilProps> = ({ heThongRapChieu, homeMenuRef }) => {
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");

  const renderHeThongRap = () => {
    return heThongRapChieu.map((item) => {
      return {
        label: (
          <img
            src={item.logo}
            alt={item.tenHeThongRap}
            className="rounded-full w-[50px]"
          ></img>
        ),
        key: item.maHeThongRap,
        // Load cụm rạp
        children: (
          <Tabs
            tabPosition={tabPosition}
            items={item.lstCumRap.map((cumRap) => {
              return {
                label: (
                  <div className="w-[300px] flex">
                    <img
                      src={cumRap.hinhAnh}
                      alt={cumRap.tenCumRap}
                      className="w-[50px]"
                    ></img>
                    <div className="ml-2 text-left">
                      <p className="mb-1">{cumRap.tenCumRap}</p>
                      <p className="text-orange-300 mb-1">Xem chi tiết</p>
                    </div>
                  </div>
                ),
                key: cumRap.maCumRap,
                // Load lịch chiếu phim tương ứng
                children: cumRap.danhSachPhim?.slice(0, 5).map((dsPhim) => {
                  return (
                    <Fragment key={dsPhim.maPhim}>
                      <div className="flex my-5">
                        <img
                          className="w-[100px] h-[100px]"
                          src={dsPhim.hinhAnh}
                          alt={dsPhim.tenPhim}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = noImages;
                          }}
                        />
                        <div className="ml-2">
                          <h1 className="text-2xl text-green-700">
                            {dsPhim.tenPhim}
                          </h1>
                          <p>{cumRap.diaChi}</p>
                          <div className="grid grid-cols-6 gap-8">
                            {dsPhim.lstLichChieuTheoPhim
                              .slice(0, 12)
                              .map((lichChieu) => {
                                return (
                                  <NavLink
                                    to={`/checkout/${lichChieu.maLichChieu}`}
                                    className="text-[18px] text-green-400 hover:text-green-600"
                                    key={lichChieu.maLichChieu}
                                  >
                                    {moment(lichChieu.ngayChieuGioChieu).format(
                                      "hh:mm A"
                                    )}
                                  </NavLink>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      <hr />
                    </Fragment>
                  );
                }),
              };
            })}
          />
        ),
      };
    });
  };
  return (
    <div ref={homeMenuRef}>
      <Tabs
        tabPosition={tabPosition}
        items={renderHeThongRap()}
        destroyInactiveTabPane
      />
    </div>
  );
};

export default memo(HomeMenu);
