import React from 'react';

export default function Picture(props) {
  const { picture } = props;

  return (
    <div>
      <img src={picture} />
    </div>
  );
}
