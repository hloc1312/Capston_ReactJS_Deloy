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
import { Input } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import { getListMovie, xoaPhim } from "../../store/quanLyPhim";
import noImages from "../../assets/images/noImages.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { DanhSachNguoiDung } from "../../types/quanLyNguoiDungTypes";
import { danhSachNguoiDungAction } from "../../store/quanLyNguoiDung";

interface DataType {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  matKhau: string;
  maLoaiNguoiDung: string;
  id?: number;
}

const Users = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // dispatch(xoaPhim(findMaPhim?.maPhim as number));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [maPhimDelete, setMaPhimDelete] = useState(0);
  const { danhSachNguoiDung } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });

  //   const findMaPhim = listMovie.find((item) => item.maPhim === maPhimDelete);

  const dispatch = useAppDispath();
  const { Search } = Input;
  const onSearch = (value: string) => {
    dispatch(danhSachNguoiDungAction(value));
  };

  const id = danhSachNguoiDung?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  console.log({ id });
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "id",

      sorter: (a, b) => (a.id as number) - (b.id as number),
      sortDirections: ["descend"],
      width: "5%",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        const taiKhoanA = a.taiKhoan.toLocaleLowerCase().trim();
        const taiKhoanB = b.taiKhoan.toLocaleLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      width: "15%",
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
      sorter: (a, b) => {
        const matKhauA = a.matKhau.toLocaleLowerCase().trim();
        const matKhauB = b.matKhau.toLocaleLowerCase().trim();
        if (matKhauA > matKhauB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: "10%",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        const hoTenA = a.hoTen.toLocaleLowerCase().trim();
        const hoTenB = b.hoTen.toLocaleLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],

      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        const emailA = a.email.toLocaleLowerCase().trim();
        const emailB = b.email.toLocaleLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],

      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      sorter: (a, b) => {
        const soDtA = a.soDT.toLocaleLowerCase().trim();
        const soDtB = b.soDT.toLocaleLowerCase().trim();
        if (soDtA > soDtB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend"],

      width: "15%",
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",

      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              to={"admin/users"}
              //   to={`/admin/films/editfilm/${film.maPhim}`}
              className="focus:outline-none hover:text-white text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-yellow-900 mr-2"
            >
              <EditOutlined className="text-2xl" />
            </NavLink>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 mr-2 dark:focus:ring-red-900"
              onClick={() => {
                showModal();
                // setMaPhimDelete(film.maPhim);
              }}
            >
              <DeleteOutlined className="text-2xl" />
            </button>
          </Fragment>
        );
      },
      width: "25%",
    },
  ];
  const data = id;
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    dispatch(danhSachNguoiDungAction(""));
  }, []);
  return (
    <div>
      <h3 className="capitalize text-4xl">quản lý người dùng</h3>
      <Button
        className="capitalize mb-5"
        onClick={() => navigate("/admin/users/adduser")}
      >
        thêm người dùng
      </Button>
      <Search
        placeholder="Nhập họ tên hoặc tên tài khoản..."
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
        title={<span className="text-red-500 font-bold">Xóa người dùng</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-2xl">
          Bạn có chắc muốn xóa người dùng này không ?{" "}
          <span className="text-red-500 font-bold">
            {/* ({findMaPhim?.tenPhim}) */}
          </span>
        </p>
      </Modal>
    </div>
  );
};

export default Users;
