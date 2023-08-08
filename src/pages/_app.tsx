import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { ToastContainer } from "react-toastify";

import { Analytics } from "@vercel/analytics/react";
import { GlobalStyle } from "../styles/global";
import theme from "../styles/theme";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AppProvider } from "../hooks";

import "../styles/globals.css";

import "react-toastify/dist/ReactToastify.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppProvider>
      <GlobalStyle />
      <ToastContainer />
      <Analytics />
    </ThemeProvider>
  );
};

export default MyApp;
