import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const HEADER_HEIGHT = 64; // AppBar height (desktop)

const Layout = (props) => {
  return (
    <>
      <Header />

      <main
        style={{
          minHeight: "80vh",
          paddingTop: HEADER_HEIGHT,
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom:"16px"
        }}
      >
        {props.children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
