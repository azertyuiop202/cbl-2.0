import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Logout = (props) => {
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState();

  useEffect(() => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
    setRedirect('/login');
  }, []);

  return redirect ? (<Navigate to={redirect} />) : null;
}

export default Logout;
