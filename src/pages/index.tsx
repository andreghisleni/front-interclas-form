import React, { useEffect } from "react";
import Router from "next/router";

const Home: React.FC = () => {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/") {
      Router.push("/404");
    }
  });
  return <div />;
};

export default Home;
