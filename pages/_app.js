import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Router from "next/router";
import NextNProgress from "nextjs-progressbar";
import { CookiesProvider } from "react-cookie";
import PageChange from "components/PageChange/PageChange.js";
import Maintenance from "components/Maintenance";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import axios from "axios";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    let comment = document.createComment(`
=========================================================
Business Premises
=========================================================

`);
    document.insertBefore(comment, document.documentElement);
  }, []);

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return <Maintenance />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Business Premises</title>
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
        </Head>
        <Layout>
          <NextNProgress />
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </Layout>
      </React.Fragment>
    );
  }
}

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
