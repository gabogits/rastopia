import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Yukimiyo</title>
        <link rel="icon" href="favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,600;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Yukimiyo: Renueva tu estilo."
        />
        <title>Yukimiyo: Renueva tu estilo. </title>
      </Head>

      <main>
        <Header />
        {props.children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
