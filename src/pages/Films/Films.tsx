import { Button, Modal, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, {
  ChangeEvent,
  Fragment,
  HtmlHTMLAttributes,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  AudioOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import { getListMovie, xoaPhim } from "../../store/quanLyPhim";
import noImages from "../../assets/images/noImages.jpg";
import { NavLink, useNavigate } from "react-router-dom";

interface DataType {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

const Films = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(xoaPhim(findMaPhim?.maPhim as number));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [maPhimDelete, setMaPhimDelete] = useState(0);
  const { listMovie } = useSelector((state: RootState) => {
    return state.quanLyPhimReducer;
  });

  const findMaPhim = listMovie.find((item) => item.maPhim === maPhimDelete);

  const dispatch = useAppDispath();
  const { Search } = Input;
  const onSearch = (value: string) => {
    dispatch(getListMovie(value));
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",

      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      width: "15%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              className="w-[50px] h-[50px]"
              onError={(e: any) => {
                e.target.onError = null;
                e.target.src = { noImages };
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        const phimA = a.tenPhim.toLocaleLowerCase().trim();
        const phimB = b.tenPhim.toLocaleLowerCase().trim();
        if (phimA > phimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        const phimA = a.moTa.toLocaleLowerCase().trim();
        const phimB = b.moTa.toLocaleLowerCase().trim();
        if (phimA > phimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      render: (text, film) => {
        return (
          <Fragment>
            <span>
              {film.moTa.length > 50
                ? film.moTa.slice(0, 50) + "..."
                : film.moTa}
            </span>
          </Fragment>
        );
      },
      width: "25%",
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",

      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/films/editfilm/${film.maPhim}`}
              className="focus:outline-none hover:text-white text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-yellow-900 mr-2"
            >
              <EditOutlined className="text-2xl" />
            </NavLink>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 mr-2 dark:focus:ring-red-900"
              onClick={() => {
                showModal();
                setMaPhimDelete(film.maPhim);
              }}
            >
              <DeleteOutlined className="text-2xl" />
            </button>
            <NavLink
              to={`/admin/films/showtimes/${film.maPhim}`}
              className="focus:outline-none text-white text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-blue-900"
              onClick={() => localStorage.setItem("film", JSON.stringify(film))}
            >
              <CalendarOutlined className="text-2xl" />
            </NavLink>
          </Fragment>
        );
      },
      width: "25%",
    },
  ];
  const data = listMovie;
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    dispatch(getListMovie(""));
  }, []);
  return (
    <div>
      <h3 className="capitalize text-4xl">quản lý phim</h3>
      <Button
        className="capitalize mb-5"
        onClick={() => navigate("/admin/films/addfilm")}
      >
        thêm phim
      </Button>
      <Search
        placeholder="Nhập từ khóa..."
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
        className="mb-5"
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
      <Modal
        title={<span className="text-red-500 font-bold">Xóa phim</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-2xl">
          Bạn có chắc muốn xóa phim này không ?{" "}
          <span className="text-red-500 font-bold">
            ({findMaPhim?.tenPhim})
          </span>
        </p>
      </Modal>
    </div>
  );
};

export default Films;
