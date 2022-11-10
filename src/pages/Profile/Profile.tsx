import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, Input } from "antd";
import { RootState, useAppDispath } from "../../store/configStore";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  capNhatThongTinNguoiDung,
  lichSuNguoiDungDatVe,
} from "../../store/quanLyNguoiDung";
import { useFormik } from "formik";
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import { USER_LOGIN } from "../../utils/config";
const Profile = () => {
  const { Panel } = Collapse;
  const dispatch = useAppDispath();
  const { thongTinNguoiDung } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });
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
    onSubmit: (values: any) => {
      console.log("values", values);
      dispatch(capNhatThongTinNguoiDung(values));
    },
  });
  useEffect(() => {
    dispatch(lichSuNguoiDungDatVe());
  }, []);

  return (
    <div className="ThongTinCaNhan container mx-auto py-20 pt-[150px]">
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
          key="2"
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
            </Form.Item>
            <Form.Item label="Email">
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Họ tên">
              <Input
                name="hoTen"
                value={formik.values.hoTen}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input
                name="soDt"
                value={formik.values.soDt}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
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
