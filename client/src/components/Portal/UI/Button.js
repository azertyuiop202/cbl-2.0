import React from 'react';

const Button = (props) => {
  const buttonLink = (
    <a href={void(0)} style={{ fontSize: props.fontSize || '1.5em', cursor: 'pointer' }} onClick={props.callback}>
      {props.text}
    </a>
  );

  return !(props.ignoreDiv || false)
    ? <div style={{ margin: props.margin || '2em' }}>{buttonLink}</div>
    : buttonLink;
}

export default Button;