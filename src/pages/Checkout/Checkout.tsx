import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import screen from "../../assets/images/screen.png";
import {
  datGhe,
  datVe,
  getListPhongVe,
  quanLyDatVeAction,
} from "../../store/quanLyDatVe";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./checkout.css";
import cn from "classnames";
import _, { upperCase } from "lodash";
import { DanhSachGhe, DatVe } from "../../types/quanLyDatVeTypes";
import { TOKEN, USER_LOGIN } from "../../utils/config";
import { Tabs } from "antd";
import { lichSuNguoiDungDatVe } from "../../store/quanLyNguoiDung";
import Loading from "../../components/Molecules/Loading/Loading";
import { connection } from "../..";

interface DanhSachGheKhachDat {
  taiKhoan: string;
  danhSachGhe: string;
}

const Checkout = () => {
  const { user } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });

  const {
    chiTietPhongVe,
    danhSachGheDangDat,
    isFetchingDatVe,
    danhSachGheKhachDangDat,
  } = useSelector((state: RootState) => {
    return state.quanLyDatVeReducer;
  });
  // console.log({ danhSachGheKhachDangDat });
  const thongTinPhim = chiTietPhongVe?.thongTinPhim;
  const danhSachGhe = chiTietPhongVe?.danhSachGhe;

  const dispatch = useAppDispath();

  // lấy thông tin param từ url
  const params = useParams();

  const renderGhe = () => {
    return danhSachGhe?.map((ghe, index) => {
      // Kiểm tra xem tửng ghế có trong mảng danhSachGheDangDat hay không
      const indexGhe = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      // Kiểm tra xem tửng ghế có trong mảng danhSachGheKhachDangDat hay không
      let classGheKhachDat = "";
      const indexGheKD = danhSachGheKhachDangDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

      let classGheDD = "";
      if (indexGhe !== -1) {
        classGheDD = "gheDangDat";
      }
      let classGheMinhDat = "";
      if (user?.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheMinhDat = "gheDoMinhDat";
      }
      return (
        <Fragment key={ghe.maGhe}>
          <button
            disabled={ghe.daDat || classGheKhachDat !== ""}
            onClick={() => {
              // dispatch(quanLyDatVeAction.datVe(ghe));
              dispatch(datGhe({ ghe: ghe, maLichChieu: Number(params.id) }));
            }}
            className={cn(
              "ghe font-bold",
              { gheVip: ghe.loaiGhe === "Vip" },
              { gheDaDat: ghe.daDat === true },
              { gheDangDat: classGheDD !== "" },
              { gheDoMinhDat: classGheMinhDat !== "" },
              {
                gheKhachDangDat: classGheKhachDat !== "",
              }
            )}
          >
            {ghe.daDat ? (
              classGheMinhDat !== "" ? (
                <i className="far fa-user"></i>
              ) : (
                <i className="fas fa-times"></i>
              )
            ) : classGheKhachDat !== "" ? (
              <i className="fas fa-user-check"></i>
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  useEffect(() => {
    dispatch(getListPhongVe(Number(params.id)));

    connection.on("datVeThanhCong", () => {
      dispatch(getListPhongVe(Number(params.id)));
    });

    // Vừa vào load lại những ghế người khác đặt
    connection.invoke("loadDanhSachGhe", Number(params.id));

    // Load danh sách ghế đang đặt từ server về
    connection.on(
      "loadDanhSachGheDaDat",
      (dsGheKhachDat: DanhSachGheKhachDat[]) => {
        // Loại bỏ mình ra khỏi danh sách
        dsGheKhachDat = dsGheKhachDat.filter(
          (item) => item.taiKhoan !== user?.taiKhoan
        );

        // Gộp danh sách ghế khách đặt tất cả user lại thành 1 mảng chung
        let arrGheKD = dsGheKhachDat.reduce(
          (result: DanhSachGhe[], item, index) => {
            const arrGhe = JSON.parse(item.danhSachGhe);
            return [...result, ...arrGhe];
          },
          []
        );

        // Đưa dữ liệu khách đặt lên redux
        arrGheKD = _.uniqBy(arrGheKD, "maGhe");

        // Đưa dữ liệu ghế khách đặt về redux
        dispatch(quanLyDatVeAction.datGhe(arrGheKD));
        console.log("dsGheKhachDat", dsGheKhachDat);
        // console.log("arrGheKD", arrGheKD);

        // Sự kiện reload trang
        window.addEventListener("beforeunload", clearGhe);

        return () => {
          clearGhe();
          window.removeEventListener("beforeunload", clearGhe);
        };
      }
    );
  }, []);

  const clearGhe = function (event?: any) {
    connection.invoke("huyDat", user?.taiKhoan, Number(params.id));
  };
  if (isFetchingDatVe) {
    return <Loading />;
  }
  return (
    <div className="px-4 min-h-screen mt-5">
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-9">
          <div className="flex items-center flex-col">
            <img src={screen} alt="" className="w-[80%] " />
            <div>{renderGhe()}</div>
          </div>

          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế mình đặt </th>
                  <th>Ghế đã được đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="text-center">
                    <button className="ghe font-bold text-center">00</button>
                  </td>
                  <td className="text-center">
                    <button className="ghe font-bold gheDangDat text-center">
                      00
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="ghe font-bold gheVip text-center">
                      00
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="ghe font-bold gheDoMinhDat text-center">
                      <i className="far fa-user"></i>
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="ghe font-bold gheDaDat text-center">
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="ghe font-bold gheKhachDangDat text-center">
                      <i className="fas fa-user-check"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex flex-col h-screen">
            <div>
              <h3 className="text-green-400 text-center text-2xl">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}
                Đ
              </h3>
              <hr />
              <h3 className="text-xl mt-2 font-bold">
                {thongTinPhim?.tenPhim}
              </h3>
              <p>Địa điểm: {thongTinPhim?.diaChi}</p>
              <p>
                Ngày chiếu:{" "}
                {moment(thongTinPhim?.ngayChieu).format("DD/MM/YYYY")} -{" "}
                {thongTinPhim?.gioChieu} -{" "}
                <span className="uppercase">{thongTinPhim?.tenRap}</span>
              </p>
              <hr />
              <div className="flex my-5 justify-between">
                <div className="w-4/5">
                  <span className="text-red-400 text-lg">Ghế: </span>
                  {_.sortBy(danhSachGheDangDat, ["stt"]).map((item) => {
                    return (
                      <span
                        className="text-green-500 text-xl font-bold"
                        key={item.maGhe}
                      >
                        {" "}
                        {item.stt}
                      </span>
                    );
                  })}
                </div>
                <div className="text-right">
                  <span className="text-green-600 text-lg">
                    {danhSachGheDangDat
                      .reduce((tongTien, ghe) => {
                        return (tongTien += ghe.giaVe);
                      }, 0)
                      .toLocaleString()}
                    Đ
                  </span>
                </div>
              </div>
              <hr />
              <div className="my-5">
                <i>Email: </i> <br />
                {user?.email}
              </div>
              <hr />
              <div className="my-5">
                <i>Phone: </i> <br />
                {user?.soDT}
              </div>
              <hr />
            </div>
            <div className="mb-0 uppercase text-center">
              <div
                onClick={async () => {
                  const thongTinDatVe: DatVe = {
                    maLichChieu: Number(params.id),
                    danhSachVe: danhSachGheDangDat,
                  };

                  await dispatch(datVe(thongTinDatVe));
                  // Đặt vé thành công gọi lại api load lại phòng vé
                  await dispatch(getListPhongVe(Number(params.id)));
                  await dispatch(quanLyDatVeAction.datVeThanhCong());
                  connection.invoke(
                    "datGheThanhCong",
                    user?.taiKhoan,
                    Number(params.id)
                  );
                  await dispatch(quanLyDatVeAction.chuyenTab());
                }}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-[16px] px-5 py-2.5 text-center uppercase cursor-pointer"
              >
                đặt vé
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Checkout;
const Demo: React.FC = () => {
  const navigate = useNavigate();
  const { tabActive } = useSelector((state: RootState) => {
    return state.quanLyDatVeReducer;
  });
  const { user } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });

  useEffect(() => {
    dispatch(quanLyDatVeAction.changeTabActive("1"));
  }, []);
  const operations = (
    <Fragment>
      {!_.isEmpty(user) ? (
        <Fragment>
          <button
            className="relative rounded px-3 py-3 mr-4 overflow-hidden group bg-[#ff3838] relative hover:bg-gradient-to-r hover:from-[#fb4848]hover:to-[#fb4848] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#fb4848] transition-all ease-out duration-300 "
            onClick={() => navigate("/profile")}
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative flex items-center">
              <div className="w-[35px] h-[35px] rounded-full bg-red-200 flex items-center justify-center mr-2">
                {user.taiKhoan?.slice(0, 1)}
              </div>
              <div>Hello {user.taiKhoan} !</div>
            </span>
          </button>
          <button
            className="relative rounded px-3 py-3 mr-4 overflow-hidden group bg-[#ff3838] relative hover:bg-gradient-to-r hover:from-[#fb4848]hover:to-[#fb4848] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#fb4848] transition-all ease-out duration-300"
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              window.location.reload();
              navigate("/home");
            }}
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative inline-block leading-[35px]">
              Đăng xuất
            </span>
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  const dispatch = useAppDispath();
  return (
    <div className="p-4">
      <Tabs
        tabBarExtraContent={operations}
        activeKey={tabActive.toString()}
        destroyInactiveTabPane
        tabPosition={"top"}
        onChange={(key) => {
          dispatch(quanLyDatVeAction.changeTabActive(key));
        }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          if (id === "1") {
            return {
              label: `01 CHỌN GHẾ & THANH TOÁN`,
              key: id,
              children: <Checkout />,
            };
          } else if (id === "2") {
            return {
              label: `02 KẾT QUẢ ĐẶT VÉ`,
              key: id,
              children: <KetQuaDatVe />,
            };
          } else {
            return {
              label: (
                <button onClick={() => navigate("/")} className="uppercase">
                  <i className="fas fa-home"></i> Home
                </button>
              ),
              key: id,
              children: "",
            };
          }
        })}
      />
    </div>
  );
};

export default Demo;

const KetQuaDatVe = () => {
  const { thongTinNguoiDung } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });
  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(lichSuNguoiDungDatVe());
  }, []);

  const renderTicket = () => {
    return thongTinNguoiDung?.thongTinDatVe.map((item) => {
      const tickets = _.first(item.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={item.maVe}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={item.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {item.tenPhim}
              </h2>
              <p className="text-gray-500">
                <span className="font-bold">Giờ chiếu:</span>{" "}
                {moment(item.ngayDat).format("hh:mm A")} -{" "}
                <span className="font-bold">Ngày chiếu:</span>{" "}
                {moment(item.ngayDat).format("DD/MM/YYYY")}
              </p>
              <p className="text-gray-500">
                <span className="font-bold"> Địa điểm: </span>
                {tickets?.tenHeThongRap}
              </p>
              <p className="text-gray-500 uppercase">
                <span className="font-bold">Tên rạp: </span>
                {tickets?.tenCumRap} - <span className="font-bold">Ghế:</span>{" "}
                {item.danhSachGhe.map((ghe, index) => {
                  return (
                    <span
                      key={index}
                      className="text-green-500 text-[16px] font-bold"
                    >
                      [{ghe.tenGhe}]{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-900 uppercase font-bold">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem thông tin địa điểm và thời gian để xem phim vui bạn nhé!
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicket()}</div>
        </div>
      </section>
    </div>
  );
};
