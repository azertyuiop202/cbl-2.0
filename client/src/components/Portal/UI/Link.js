import React from 'react';

const Link = (props) => {
  return (
    <div style={{ margin: '2em' }}>
      <a href={props.url} style={{ fontSize: '1.5em' }}>{props.text}</a>
    </div>
  );
}

export default Link;