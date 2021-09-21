import React from "react";
import Header from "../Header";
import { Helmet } from "react-helmet";

export default function Layout({ children, title, location }) {
  return (
    <>
      <Helmet
        htmlAttribute={{lang: 'en'}}
        title={{title:`Bearcabulary ${title ? " • " + title : ""}`}}
        meta={[
          {name: 'description'},
          {content: "Bearcabulary is a word game for children K-3. Bearcabulary tests students to spell a missing word in a sentence using jumbled letters."}
        ]}
      />
        <meta charSet="utf-8" />
        <title>{`Bearcabulary ${title ? " • " + title : ""}`}</title>
        <meta name="description" content="Word game for children K-3. Bearcabulary tests students to spell a missing word in a sentence. Students will see the word briefly before " />
        <link
          rel="canonical"
          href={`https://bearcabulary.com/${location.pathname}`}
        />
      </Helmet>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>{`Bearcabulary ${title ? " • " + title : ""}`}</title>
        <meta name="description" content="Word game for children K-3. Bearcabulary tests students to spell a missing word in a sentence. Students will see the word briefly before " />
        <link
          rel="canonical"
          href={`https://bearcabulary.com/${location.pathname}`}
        />
      </Helmet> */}
      <Header />
      {children}
    </>
  );
}
