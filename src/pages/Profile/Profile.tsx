import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, Input, Modal } from "antd";
import { RootState, useAppDispath } from "../../store/configStore";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  capNhatThongTinNguoiDung,
  lichSuNguoiDungDatVe,
} from "../../store/quanLyNguoiDung";
import { useFormik } from "formik";
import { CheckCircleFilled } from "@ant-design/icons";
import * as Yup from "yup";
import Loading from "../../components/Molecules/Loading/Loading";

const Profile = () => {
  const { Panel } = Collapse;
  const dispatch = useAppDispath();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // navigate("/admin/films");
  };
  const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;

  const { thongTinNguoiDung, isFetchingCapNhat, errCapNhat } = useSelector(
    (state: RootState) => {
      return state.quanLyNguoiDungReducer;
    }
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung?.taiKhoan,
      matKhau: thongTinNguoiDung?.matKhau,
      email: thongTinNguoiDung?.email,
      soDt: thongTinNguoiDung?.soDT,
      maNhom: thongTinNguoiDung?.maNhom,
      maLoaiNguoiDung: thongTinNguoiDung?.maLoaiNguoiDung,
      hoTen: thongTinNguoiDung?.hoTen,
    },
    validationSchema: Yup.object({
      matKhau: Yup.string().required("Mật khẩu không được bỏ trống!"),
      email: Yup.string()
        .email("Định dạng email không đúng!")
        .required("Email không được bỏ trống!"),
      soDt: Yup.string()
        .matches(phoneRegExp, "Định dạng số điện thoại không đúng!")
        .required("Số điện thoại không được bỏ trống!"),
      hoTen: Yup.string().required("Họ tên không được để trống!"),
    }),
    onSubmit: (values: any) => {
      console.log("values", values);
      dispatch(capNhatThongTinNguoiDung(values))
        .unwrap()
        .then(() => {
          showModal();
        });
    },
  });
  useEffect(() => {
    dispatch(lichSuNguoiDungDatVe());
  }, []);
  if (isFetchingCapNhat) {
    return <Loading />;
  }
  return (
    <div className="ThongTinCaNhan container mx-auto py-20 pt-[150px]">
      <Modal
        title={<span className="text-green-500">Cập nhật thành công</span>}
        open={isModalOpen}
        onOk={handleOk}
        destroyOnClose
        closable={false}
        footer={[
          <div className="text-center">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg  text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleOk}
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
            cập nhật thành công!
          </p>
        </div>
      </Modal>
      <p className="text-xl text-center mb-10 font-bold uppercase">
        Trang cá nhân
      </p>
      <div className="text-lg font-semibold border-b pb-3 flex">
        <div>
          <img
            src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"
            alt=""
            className="w-40"
          />
        </div>
        <div className="pl-5">
          <div>
            <label>Tài khoản: </label>
            <span className="text-amber-500 mr-2">
              {thongTinNguoiDung?.taiKhoan}
            </span>

            <span className="text-blue-500 text-sm">
              ( {thongTinNguoiDung?.maLoaiNguoiDung} )
            </span>
          </div>

          <p>
            <span>Email: </span>
            <span className="text-amber-500 mr-2">
              {thongTinNguoiDung?.email}
            </span>
          </p>
          <p>
            <span>Họ tên: </span>
            <span className="text-amber-500 mr-2">
              {thongTinNguoiDung?.hoTen}
            </span>
          </p>
          <p>
            <span>Số điện thoại: </span>
            <span className="text-amber-500">{thongTinNguoiDung?.soDT}</span>
          </p>
        </div>
      </div>
      <Collapse accordion>
        <Panel
          key={"1"}
          header={
            <span className="text-lg font-semibold text-amber-500">
              Lịch sử đặt vé
            </span>
          }
        >
          <div>
            {thongTinNguoiDung?.thongTinDatVe.map((ve, i) => (
              <div key={i} className="py-2 border-b grid grid-cols-12">
                <div className="col-span-4 md:col-span-2 lg:col-span-1">
                  <img src={ve.hinhAnh} alt="" className="w-full" />
                </div>
                <div className="col-span-8 pl-3 md:col-span-3">
                  <p className="m-0 text-xl font-bold text-amber-500">
                    {ve.tenPhim}
                  </p>
                  <p className="m-0 text-green-500">
                    Thời lượng phim: {ve.thoiLuongPhim}p
                  </p>
                  <p className="m-0 text-amber-500">
                    Ngày đặt: {moment(ve.ngayDat).format("HH:mm DD-MM-YYYY")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-7 md:pl-3">
                  <p className="m-0 font-semibold">Danh sách ghế</p>
                  {ve.danhSachGhe.map((ghe, i) => (
                    <div key={i}>
                      <span className="font-semibold">Ghế: </span>
                      <span className="text-amber-500">{ghe.tenGhe}</span>
                      <span>/</span>
                      <span className="text-amber-500">{ghe.tenRap}</span>
                      <span>/</span>
                      <span className="text-amber-500">
                        {ghe.tenHeThongRap}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="col-span-12 lg:col-span-1">
                  <p>
                    <span className="font-semibold">Tổng tiền:</span>{" "}
                    <span className="text-amber-500 text-xl font-semibold">
                      {(ve.giaVe * ve.danhSachGhe.length).toLocaleString()}đ
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          header={
            <span className="text-lg font-semibold text-amber-500">
              Cập nhật thông tin cá nhân
            </span>
          }
          key={"2"}
        >
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label="Tài khoản">
              <Input
                name="taiKhoan"
                value={formik.values.taiKhoan as string}
                onChange={formik.handleChange}
                disabled={true}
              />
            </Form.Item>

            <Form.Item label="Mật khẩu">
              <Input.Password
                name="matKhau"
                value={formik.values.matKhau}
                onChange={formik.handleChange}
              />
              {formik.errors.matKhau && formik.touched ? (
                <p className="text-red-500">{formik.errors?.matKhau}</p>
              ) : null}
            </Form.Item>
            <Form.Item label="Email">
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched ? (
                <p className="text-red-500">{formik.errors?.email}</p>
              ) : null}
            </Form.Item>
            <Form.Item label="Họ tên">
              <Input
                name="hoTen"
                value={formik.values.hoTen}
                onChange={formik.handleChange}
              />
              {formik.errors.hoTen && formik.touched ? (
                <p className="text-red-500">{formik.errors?.hoTen}</p>
              ) : null}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input
                name="soDt"
                value={formik.values.soDt}
                onChange={formik.handleChange}
              />
              {formik.errors.soDt && formik.touched ? (
                <p className="text-red-500">{formik.errors?.soDt}</p>
              ) : null}
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
              {errCapNhat !== "" ? (
                <p className="text-red-500 font-bold">{errCapNhat.content}</p>
              ) : (
                ""
              )}
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Profile;
