import { Button, Form, Input, Modal, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { quanLyNguoiDungService } from "../../../services/quanLyNguoiDungService";
import { LoaiNguoiDung } from "../../../types/quanLyNguoiDungTypes";
import { GROUPID } from "../../../utils/config";
import * as Yup from "yup";
import { RootState, useAppDispath } from "../../../store/configStore";
import {
  capNhatNguoiDungAdmin,
  danhSachNguoiDungAction,
  themNguoiDung,
} from "../../../store/quanLyNguoiDung";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CapNhatNguoiDung } from "../../../types/quanLyNguoiDungTypes";
type SizeType = Parameters<typeof Form>[0]["size"];
const EditUser = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const dispatch = useAppDispath();
  const params = useParams();
  const { errCapNhatNguoiDungAdmin, danhSachNguoiDung } = useSelector(
    (state: RootState) => {
      return state.quanLyNguoiDungReducer;
    }
  );

  //   let thongTinUser = {
  //     email: "706@gmail.com",
  //     hoTen: "Canh Canh",
  //     id: 9,
  //     maLoaiNguoiDung: "KhachHang",
  //     matKhau: "qq",
  //     soDT: "096914638533",
  //     taiKhoan: "qq",
  //   };
  //   if (localStorage.getItem("user")) {
  //     thongTinUser = JSON.parse(localStorage.getItem("user") as string);
  //   }
  console.log({ danhSachNguoiDung });
  const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: danhSachNguoiDung[0].taiKhoan,
      matKhau: danhSachNguoiDung[0].matKhau,
      email: danhSachNguoiDung[0].email,
      soDt: danhSachNguoiDung[0].soDT,
      maNhom: GROUPID,
      maLoaiNguoiDung: danhSachNguoiDung[0].maLoaiNguoiDung,
      hoTen: danhSachNguoiDung[0].hoTen,
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("T??i kho???n kh??ng ???????c b??? tr???ng!"),
      matKhau: Yup.string().required("M???t kh???u kh??ng ???????c b??? tr???ng!"),
      hoTen: Yup.string().required("H??? t??n kh??ng ???????c b??? tr???ng!"),
      email: Yup.string()
        .email("Email kh??ng ????ng ?????nh d???ng")
        .required("Email kh??ng ???????c b??? tr???ng!"),
      soDt: Yup.string()
        .matches(phoneRegExp, "?????nh d???ng s??? ??i???n tho???i kh??ng ????ng!")
        .required("S??? ??i???n tho???i kh??ng ???????c b??? tr???ng!"),
      maLoaiNguoiDung: Yup.string().required(
        "Lo???i ng?????i d??ng kh??ng ???????c b??? tr???ng!"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(capNhatNguoiDungAdmin(values))
        .then(() => showModalCapNhatNguoiDung())
        .catch(() => showModalCapNhatNguoiDung());
    },
  });
  const handleSelectChange = (value: string) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  const [loaiNguoiDung, setLoaiNguoiDung] = useState<LoaiNguoiDung[]>([]);

  const [isModalOpenCapNhatNguoiDung, setIsModalOpenCapNhatNguoiDung] =
    useState(false);

  const showModalCapNhatNguoiDung = () => {
    setIsModalOpenCapNhatNguoiDung(true);
  };

  const handleOkCapNhatNguoiDungSucess = () => {
    navigate("/admin/users");
    setIsModalOpenCapNhatNguoiDung(false);
  };

  const handleOkCapNhatNguoiDungFail = () => {
    setIsModalOpenCapNhatNguoiDung(false);
  };

  useEffect(() => {
    dispatch(danhSachNguoiDungAction(params.id as string));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
        setLoaiNguoiDung(result.data.content);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);

  return (
    <div>
      <h3 className="capitalize text-4xl">C???p nh???t ng?????i d??ng</h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        size={componentSize as SizeType}
      >
        <Form.Item label="T??i kho???n">
          <Input
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            name="taiKhoan"
            disabled
          />
          {formik.errors.taiKhoan && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.taiKhoan}</p>
          )}
        </Form.Item>
        <Form.Item label="M???t kh???u">
          <Input.Password
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            name="matKhau"
          />
          {formik.errors.matKhau && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.matKhau}</p>
          )}
        </Form.Item>
        <Form.Item label="H??? t??n">
          <Input
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            name="hoTen"
          />
          {formik.errors.hoTen && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.hoTen}</p>
          )}
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
          />
          {formik.errors.email && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.email}</p>
          )}
        </Form.Item>
        <Form.Item label="S??? ??i???n tho???i">
          <Input
            value={formik.values.soDt}
            onChange={formik.handleChange}
            name="soDt"
          />
          {formik.errors.soDt && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.soDt}</p>
          )}
        </Form.Item>
        <Form.Item label="Lo???i ng?????i d??ng">
          <Select
            onChange={handleSelectChange}
            placeholder="Ch???n lo???i ng?????i d??ng"
            value={formik.values.maLoaiNguoiDung}
          >
            {loaiNguoiDung.map((item) => (
              <Select.Option
                key={item.maLoaiNguoiDung}
                value={`${item.maLoaiNguoiDung}`}
              >
                {item.tenLoai}
              </Select.Option>
            ))}
          </Select>
          {formik.errors.maLoaiNguoiDung && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.maLoaiNguoiDung}</p>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            C???p nh???t ng?????i d??ng
          </Button>
        </Form.Item>
      </Form>

      {errCapNhatNguoiDungAdmin === "" ? (
        <Modal
          title={<span className="text-green-500">C???p nh???t th??nh c??ng</span>}
          open={isModalOpenCapNhatNguoiDung}
          onOk={handleOkCapNhatNguoiDungSucess}
          destroyOnClose
          closable={false}
          footer={[
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleOkCapNhatNguoiDungSucess}
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
              C???p nh???t th??nh c??ng!
            </p>
          </div>
        </Modal>
      ) : (
        <Modal
          title={<span className="text-red-500">C???p nh???t th???t b???i</span>}
          open={isModalOpenCapNhatNguoiDung}
          onOk={handleOkCapNhatNguoiDungFail}
          destroyOnClose
          closable={false}
          footer={[
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleOkCapNhatNguoiDungFail}
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
              {errCapNhatNguoiDungAdmin.content}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditUser;
