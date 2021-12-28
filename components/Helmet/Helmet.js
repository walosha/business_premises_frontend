import React from "react";
import { Helmet } from "react-helmet";

export const Page = function ({ title, children }) {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};
