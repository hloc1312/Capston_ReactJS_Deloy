import React, { Fragment } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Select } from "antd";
import EN from "../../../assets/images/en.png";
import VI from "../../../assets/images/vi.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../utils/config";
export const Header = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });

  const renderLogin = () => {
    if (_.isEmpty(user)) {
      return (
        <Fragment>
          <button
            className="self-center px-8 py-3 rounded"
            onClick={() => navigate("/user/login")}
          >
            {t("Sign in")}
          </button>
          <button
            onClick={() => navigate("/user/register")}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            {t("Sign up")}
          </button>
        </Fragment>
      );
    }
    return (
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
        {user.maLoaiNguoiDung === "QuanTri" ? (
          <NavLink
            to="/admin"
            className="hover:text-white rounded px-8 py-3 mr-4 overflow-hidden group bg-[#ff3838] relative hover:bg-gradient-to-r hover:from-[#fb4848]hover:to-[#fb4848] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#fb4848] transition-all ease-out duration-300"
            // onClick={() => {
            //   return <Navigate to={"/admin"} />;
            // }}
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative inline-block leading-[35px]">
              Vào trang admin
            </span>
          </NavLink>
        ) : (
          ""
        )}
        <button
          // to="/profile"
          className="relative rounded px-8 py-3 mr-4 overflow-hidden group bg-[#ff3838] relative hover:bg-gradient-to-r hover:from-[#fb4848]hover:to-[#fb4848] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#fb4848] transition-all ease-out duration-300"
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
    );
  };
  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };
  const navigate = useNavigate();
  return (
    <header className="Header p-4 dark:bg-gray-800 dark:text-gray-100 bg-opacity-40 bg-black fixed w-full text-white z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="..."
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white flex items-center px-4 -mb-1 dark:text-violet-400"
                  : "flex items-center px-4 -mb-1 dark:text-violet-400  text-white"
              }
            >
              {t("Home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white flex items-center px-4 -mb-1 dark:text-violet-400"
                  : "flex items-center px-4 -mb-1 dark:text-violet-400  text-white"
              }
            >
              {t("Contact")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white flex items-center px-4 -mb-1 dark:text-violet-400"
                  : "flex items-center px-4 -mb-1 dark:text-violet-400  text-white"
              }
            >
              {t("News")}
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
          <Select
            defaultValue="en"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "en",
                label: (
                  <span className="flex items-center">
                    <img
                      src={EN}
                      alt="..."
                      className="w-[20px] h-[20px] mr-2"
                    />
                    <span>English</span>
                  </span>
                ),
              },
              {
                value: "vi",
                label: (
                  <span className="flex items-center">
                    <img
                      src={VI}
                      alt="..."
                      className="w-[20px] h-[20px] mr-2"
                    />
                    <span>Việt Nam</span>
                  </span>
                ),
              },
            ]}
          />
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
