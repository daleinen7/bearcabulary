import React from "react";
import Header from "../Header";
import { Helmet } from "react-helmet";

export default function Layout({ children, title, location }) {
  console.log(location);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Bearcabulary ${title && "|" + title}`}</title>
        <meta name="description" content="Word game for children K-3." />
        <link
          rel="canonical"
          href={`https://bearcabulary.com/${location.pathname}`}
        />
      </Helmet>
      <Header />
      {children}
    </>
  );
}
