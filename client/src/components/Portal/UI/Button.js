import React from 'react';

const Button = (props) => {
  return (
    <div style={{ margin: '2em' }}>
      <a href={void(0)} style={{ fontSize: '1.5em', cursor: 'pointer' }} onClick={props.callback}>
        {props.text}
      </a>
    </div>
  );
}

export default Button;