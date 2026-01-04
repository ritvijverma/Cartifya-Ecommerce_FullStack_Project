import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "./UserMenu";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout>
      <Box sx={{ display: "flex", gap: 0.1 }}>
        <Box sx={{ width: 260, flexShrink: 0 }}>
          <UserMenu />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;