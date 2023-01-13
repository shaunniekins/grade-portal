import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import NProgress from "nprogress";

import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
    NProgress.done();
  });
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      {loading && <Loader />}
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
