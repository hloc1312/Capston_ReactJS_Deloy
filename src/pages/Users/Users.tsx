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
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

import { Input } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store/configStore";
import { getListMovie, xoaPhim } from "../../store/quanLyPhim";
import noImages from "../../assets/images/noImages.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { DanhSachNguoiDung } from "../../types/quanLyNguoiDungTypes";
import {
  danhSachNguoiDungAction,
  xoaNguoiDung,
} from "../../store/quanLyNguoiDung";

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
  const [isModalOpenXoaNguoiDung, setIsModalOpenXoaNguoiDung] = useState(false);
  console.log({ isModalOpenXoaNguoiDung });
  const showModalXoaNguoiDung = () => {
    setIsModalOpenXoaNguoiDung(true);
  };

  const handleOkXoaNguoiDung = () => {
    setIsModalOpenXoaNguoiDung(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(xoaNguoiDung(findTaiKhoan?.taiKhoan as string))
      .unwrap()
      .then(() => showModalXoaNguoiDung())
      .catch(() => showModalXoaNguoiDung());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [taiKhoanDelete, setTaiKhoanDelete] = useState("");
  const { danhSachNguoiDung, errXoaNguoiDung } = useSelector(
    (state: RootState) => {
      return state.quanLyNguoiDungReducer;
    }
  );
  console.log({ errXoaNguoiDung });

  const findTaiKhoan = danhSachNguoiDung.find(
    (item) => item.taiKhoan === taiKhoanDelete
  );
  console.log({ findTaiKhoan });

  const dispatch = useAppDispath();
  const { Search } = Input;
  const onSearch = (value: string) => {
    dispatch(danhSachNguoiDungAction(value));
  };

  const id = danhSachNguoiDung?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  // console.log({ id });
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

      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/users/edituser/${user.taiKhoan}`}
              //   to={`/admin/films/editfilm/${film.maPhim}`}
              className="focus:outline-none hover:text-white text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-3  dark:focus:ring-yellow-900 mr-2"
              onClick={() => localStorage.setItem("user", JSON.stringify(user))}
            >
              <EditOutlined className="text-2xl" />
            </NavLink>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 mr-2 dark:focus:ring-red-900"
              onClick={() => {
                showModal();
                setTaiKhoanDelete(user.taiKhoan);
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
        rowKey={"id"}
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
            ({findTaiKhoan?.taiKhoan})
          </span>
        </p>
      </Modal>
      {errXoaNguoiDung === "" ? (
        <Modal
          title={<span className="text-green-500">Xóa thành công</span>}
          open={isModalOpenXoaNguoiDung}
          onOk={handleOkXoaNguoiDung}
          destroyOnClose
          closable={false}
          footer={[
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleOkXoaNguoiDung}
              >
                OK
              </button>
            </div>,
          ]}
        >
          <div className="text-center">
            <CheckCircleFilled
              className="text-4xl mb-2 text-green-500"
              style={{ color: "rgb(34 197 94) " }}
            />
            <br />
            <p className="uppercase text-green-500 font-bold text-3xl">
              Xóa thành công!
            </p>
          </div>
        </Modal>
      ) : (
        <Modal
          title={<span className="text-red-500">Xóa thất bại</span>}
          open={isModalOpenXoaNguoiDung}
          onOk={handleOkXoaNguoiDung}
          destroyOnClose
          closable={false}
          footer={[
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleOkXoaNguoiDung}
              >
                OK
              </button>
            </div>,
          ]}
        >
          <div className="text-center">
            <CloseCircleFilled
              className="text-4xl mb-2 text-red-500"
              style={{ color: "rgb(239 68 68) " }}
            />
            <br />
            <p className="uppercase text-red-500 font-bold text-3xl">
              {errXoaNguoiDung.content}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Users;
