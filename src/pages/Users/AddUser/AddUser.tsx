import { Button, Form, Input, Modal, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { quanLyNguoiDungService } from "../../../services/quanLyNguoiDungService";
import { LoaiNguoiDung } from "../../../types/quanLyNguoiDungTypes";
import { GROUPID } from "../../../utils/config";
import * as Yup from "yup";
import { RootState, useAppDispath } from "../../../store/configStore";
import { themNguoiDung } from "../../../store/quanLyNguoiDung";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type SizeType = Parameters<typeof Form>[0]["size"];
const AddUser = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const dispatch = useAppDispath();
  const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống!"),
      matKhau: Yup.string().required("Mật khẩu không được bỏ trống!"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống!"),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Email không được bỏ trống!"),
      soDt: Yup.string()
        .matches(phoneRegExp, "Định dạng số điện thoại không đúng!")
        .required("Số điện thoại không được bỏ trống!"),
      maLoaiNguoiDung: Yup.string().required(
        "Loại người dùng không được bỏ trống!"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(themNguoiDung(values))
        .then(() => showModalThemNguoiDung())
        .catch(() => showModalThemNguoiDung());
    },
  });
  const handleSelectChange = (value: string) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  const [loaiNguoiDung, setLoaiNguoiDung] = useState<LoaiNguoiDung[]>([]);

  const [isModalOpenThemNguoiDung, setIsModalOpenThemNguoiDung] =
    useState(false);

  const showModalThemNguoiDung = () => {
    setIsModalOpenThemNguoiDung(true);
  };

  const handleOkThemNguoiDungSucess = () => {
    navigate("/admin/users");
    setIsModalOpenThemNguoiDung(false);
  };

  const handleOkThemNguoiDungFail = () => {
    setIsModalOpenThemNguoiDung(false);
  };

  const { errThemNguoiDung } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });

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
      <h3 className="capitalize text-4xl">Thêm người dùng</h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        size={componentSize as SizeType}
      >
        <Form.Item label="Tài khoản">
          <Input
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            name="taiKhoan"
          />
          {formik.errors.taiKhoan && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.taiKhoan}</p>
          )}
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input.Password
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            name="matKhau"
          />
          {formik.errors.matKhau && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.matKhau}</p>
          )}
        </Form.Item>
        <Form.Item label="Họ tên">
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
        <Form.Item label="Số điện thoại">
          <Input
            value={formik.values.soDt}
            onChange={formik.handleChange}
            name="soDt"
          />
          {formik.errors.soDt && formik.touched && (
            <p className="text-red-500 mb-0">{formik.errors.soDt}</p>
          )}
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Select
            onChange={handleSelectChange}
            placeholder="Chọn loại người dùng"
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
            Thêm người dùng
          </Button>
        </Form.Item>
      </Form>

      {errThemNguoiDung === "" ? (
        <Modal
          title={<span className="text-green-500">Thêm thành công</span>}
          open={isModalOpenThemNguoiDung}
          onOk={handleOkThemNguoiDungSucess}
          destroyOnClose
          closable={false}
          footer={[
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleOkThemNguoiDungSucess}
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
              Thêm thành công!
            </p>
          </div>
        </Modal>
      ) : (
        <Modal
          title={<span className="text-red-500">Thêm thất bại</span>}
          open={isModalOpenThemNguoiDung}
          onOk={handleOkThemNguoiDungFail}
          destroyOnClose
          closable={false}
          footer={[
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleOkThemNguoiDungFail}
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
              {errThemNguoiDung.content}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddUser;
