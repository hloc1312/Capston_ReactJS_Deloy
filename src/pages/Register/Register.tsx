import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GROUPID } from "../../utils/config";
import * as Yup from "yup";
import { dangKyAction } from "../../store/quanLyNguoiDung";
import { RootState, useAppDispath } from "../../store/configStore";
import { useSelector } from "react-redux";
import Loading from "../../components/Molecules/Loading/Loading";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const { errRegister, isFetchingRegister } = useSelector(
    (state: RootState) => {
      return state.quanLyNguoiDungReducer;
    }
  );
  const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      confirmPassword: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tải khoản không được bỏ trống!"),
      matKhau: Yup.string().required("Mật khẩu không được bỏ trống!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("matKhau"), null], "Mật khẩu không trùng khớp!")
        .required("Nhập lại mật khẩu không được bỏ trống!"),
      email: Yup.string()
        .email("Định dạng email không đúng!")
        .required("Email không được bỏ trống!"),
      soDt: Yup.string()
        .matches(phoneRegExp, "Định dạng số điện thoại không đúng!")
        .required("Số điện thoại không được bỏ trống!"),
      hoTen: Yup.string().required("Họ tên không được để trống!"),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);
      formik.setFieldValue("maNhom", "GP13");
      dispatch(dangKyAction(values))
        .unwrap()
        .then(() => navigate("/user/login"));
    },
  });
  if (isFetchingRegister) {
    return <Loading />;
  }
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm lg:overflow-y-scroll lg:h-screen">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="uppercase text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            cyberlearn
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-4 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold uppercase"
        >
          đăng ký
        </h2>
        <div className="mt-12">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Tài khoản
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Nhập vào tài khoản"
                value={formik.values.taiKhoan}
                onBlur={formik.handleBlur}
              />
              {formik.errors.taiKhoan && formik.touched ? (
                <p className="text-red-500">{formik.errors.taiKhoan}</p>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật khẩu
                </div>
              </div>
              <input
                name="matKhau"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Nhập vào mật khẩu"
                value={formik.values.matKhau}
                onBlur={formik.handleBlur}
              />
              {formik.errors.matKhau && formik.touched ? (
                <p className="text-red-500">{formik.errors.matKhau}</p>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Nhập Lại Mật khẩu
                </div>
              </div>
              <input
                name="confirmPassword"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
              />
              {formik.errors.confirmPassword && formik.touched ? (
                <p className="text-red-500">{formik.errors.confirmPassword}</p>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Họ Tên
                </div>
              </div>
              <input
                name="hoTen"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Nhập vào họ tên"
                value={formik.values.hoTen}
                onBlur={formik.handleBlur}
              />
              {formik.errors.hoTen && formik.touched ? (
                <p className="text-red-500">{formik.errors.hoTen}</p>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </div>
              </div>
              <input
                name="email"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Nhập vào email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Số điện thoại
                </div>
              </div>
              <input
                name="soDt"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Nhập vào số điện thoại"
                value={formik.values.soDt}
                onBlur={formik.handleBlur}
              />
              {formik.errors.soDt && formik.touched ? (
                <p className="text-red-500">{formik.errors.soDt}</p>
              ) : null}
            </div>

            <div className="mt-10 mb-8">
              {errRegister !== "" ? (
                <p className="text-red-500 font-bold">{errRegister.content}</p>
              ) : (
                ""
              )}
              <div className="flex justify-between">
                <button
                  className="bg-indigo-500 text-gray-100 p-4 w-[40%]  rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                        shadow-lg mb-8"
                >
                  Đăng Ký
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/user/login")}
                  className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group w-[40%] mb-8"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Đăng Nhập
                  </span>
                  <span className="relative invisible">Đăng Nhập</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
