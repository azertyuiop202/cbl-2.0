import React from 'react';
import { useNavigate } from 'react-router-dom';

const Link = (props) => {
  const navigate = useNavigate();

  const goToUrl = () => {
    navigate(props.url);
  }

  return (
    <div style={{ margin: '2em' }}>
      <a href={void(0)} onClick={goToUrl} style={{ fontSize: '1.5em', cursor: 'pointer' }}>{props.text}</a>
    </div>
  );
}

export default Link;