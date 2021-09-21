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
          {content: "Bearcabulary is a word game for children K-3. Bearcabulary tests students to spell a missing word in a sentence using jumbled letters."},
          {name: 'keywords', content: 'Educational Game, Word Game, Word Jumble' },
          {name: 'charSet', content: 'htf-8'}
        ]}
        links={[
          {rel: 'canonical', href: `https://bearcabulary.com/${location.pathname}`}
        ]}
      />
      <Header />
      {children}
    </>
  );
}
