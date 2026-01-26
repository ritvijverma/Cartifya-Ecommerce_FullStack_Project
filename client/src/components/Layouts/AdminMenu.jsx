import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UserOutlined,
  CreditCardOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  
} from "@ant-design/icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";

const { Header, Sider, Content } = Layout;

const AdminMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={240}
        style={{
          background: "#001528",
        }}
      >
        <div
          style={{
            height: 64,
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Admin Panel
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/dashboard/admin"]}
        >
          <Menu.Item key="/dashboard/admin" icon={<DashboardOutlined />}>
            <NavLink to="/dashboard/admin">Dashboard</NavLink>
          </Menu.Item>

          <Menu.Item
            key="/dashboard/admin/create-category"
            icon={<AppstoreOutlined />}
          >
            <NavLink to="/dashboard/admin/create-category">
              Categories
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="/dashboard/admin/create-product"
            icon={<ShoppingOutlined />}
          >
            <NavLink to="/dashboard/admin/create-product">
             Create Products
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="/dashboard/admin/product"
            icon={<ShoppingOutlined />}
          >
            <NavLink to="/dashboard/admin/product">
             Products
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="/dashboard/admin/customers"
            icon={<UserOutlined />}
          >
            <NavLink to="/dashboard/admin/customers">
              Customers
            </NavLink>
          </Menu.Item>

          <Menu.Item icon={<CreditCardOutlined />}>
            Payments
          </Menu.Item>

          <Menu.Item icon={<SettingOutlined />}>
            Settings
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* MAIN LAYOUT */}
      <Layout>
        {/* HEADER */}
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />

          <h3 style={{ marginLeft: 16 }}>E-Commerce Admin</h3>
        </Header>

        {/* CONTENT */}
        <Content
          style={{
            margin: "16px",
            padding: 24,
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminMenu;
