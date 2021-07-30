import React from 'react';
import JSONData from '../../static/stories/testing-title.json';
const useJsonData = () => (
  <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
    <h1>{JSONData.title}</h1>
    <ul>
      {JSONData.section.map((data, index) => {
        return <li key={`content_item_${index}`}>{data.sentence}</li>;
      })}
    </ul>
  </div>
);
export default useJsonData;
