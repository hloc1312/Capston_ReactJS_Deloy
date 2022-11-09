import { Breadcrumb, Layout, Menu } from "antd";
import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../../store/configStore";
import { TOKEN, USER_LOGIN } from "../../../utils/config";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => {
    return state.quanLyNguoiDungReducer;
  });

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    // console.log(collapsed);
    setCollapsed(collapsed);
  };

  const operations = (
    <Fragment>
      {!_.isEmpty(user) ? (
        <Fragment>
          <button
            className="relative rounded px-3 py-3 mr-4 overflow-hidden group bg-[#ff3838] relative hover:bg-gradient-to-r hover:from-[#fb4848]hover:to-[#fb4848] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#fb4848] transition-all ease-out duration-300 "
            onClick={() => navigate("/profile")}
          >
            <span className="absolute right-0 w-8 h-32  -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative flex items-center h-[30px]">
              <div className="w-[35px] h-[35px] rounded-full bg-red-200 flex items-center justify-center mr-2">
                {user.taiKhoan?.slice(0, 1)}
              </div>
              <div>Hello {user.taiKhoan} !</div>
            </span>
          </button>
          <button
            className="relative rounded px-3 py-3 mr-4 overflow-hidden group bg-[#ff3838]  hover:bg-gradient-to-r hover:from-[#fb4848]hover:to-[#fb4848] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#fb4848] transition-all ease-out duration-300"
            onClick={() => {
              navigate("/home");
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              window.location.reload();
            }}
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease "></span>
            <span className="relative flex items-center h-[30px]">
              Đăng xuất
            </span>
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!localStorage.getItem(USER_LOGIN)) {
    // alert("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/home"></Navigate>;
  }
  if (user?.maLoaiNguoiDung !== "QuanTri") {
    // alert("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/home"></Navigate>;
  }
  return (
    <div>
      <Fragment>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div
              className="logo p-5 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <img
                src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                alt="..."
              />
            </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              {/* <Menu.Item key="1" icon={<UserOutlined />}>
                <NavLink to="/admin/users">Users</NavLink>
              </Menu.Item> */}
              <SubMenu key="sub2" icon={<UserOutlined />} title="User">
                <Menu.Item key="20" icon={<UserOutlined />}>
                  <NavLink to="/admin/users">Users</NavLink>
                </Menu.Item>
                <Menu.Item key="21" icon={<FileOutlined />}>
                  <NavLink to="/admin/users/adduser">Add user</NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                <Menu.Item key="10" icon={<FileOutlined />}>
                  <NavLink to="/admin/films">Films</NavLink>
                </Menu.Item>
                <Menu.Item key="11" icon={<FileOutlined />}>
                  <NavLink to="/admin/films/addfilm">Add new</NavLink>
                </Menu.Item>
              </SubMenu>
              {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
                <NavLink to="/admin/showtimes">Showtime</NavLink>
              </Menu.Item> */}
              {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="text-right pr-10 pt-1 leading-[54px]">
                {operations}
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: "85vh" }}
              >
                {/* <Component {...propsRoute} /> */}
                <Outlet />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Fragment>
    </div>
  );
};

export default AdminTemplate;
