import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserRoute from "./components/Routes/UserRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Customers from "./pages/Admin/Customers";
import AdminHome from "./pages/Admin/AdminHome";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import UserHome from "./pages/user/UserHome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard">
          {/* User Dashboard */}
          <Route element={<UserRoute />}>
            {/* <Route path="user" element={<Dashboard />} /> */}
            <Route path="user" element={<Dashboard />}>
              <Route index element={<UserHome />} />
              <Route path="profile" element={<UserHome />} />
            </Route>
            


          </Route>




        {/* Admin */}
  <Route element={<AdminRoute />}>
    <Route path="admin" element={<AdminDashboard />}>
      <Route index element={<AdminHome />} />
      <Route path="admin-home" element={<AdminHome />} />
      <Route path="create-category" element={<CreateCategory />} />
      <Route path="create-product" element={<CreateProduct />} />
      <Route path="customers" element={<Customers />} />
    </Route>
  </Route>
</Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
