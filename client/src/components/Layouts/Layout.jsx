import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toolbar } from "@mui/material";

const HEADER_HEIGHT = 64; // AppBar height (desktop)

const Layout = (props) => {
  return (
    <>
      <Header />
{/* <Toolbar/> */}
      <main
        style={{
          minHeight: "80vh",
          // padding:"16px"
        }}
      >
        {props.children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
