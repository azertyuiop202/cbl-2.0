import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';

import fetch from '../../utils/fetch';

const Login = (props) => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(isLoggedIn ? '/': undefined);
  const [formData, setFormData] = useState({
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    loginError: ''
  });

  const login = (user) => {
    return fetch(`/api/auth/login`, 'post', false, user).then(body => {
      localStorage.setItem('auth_token', body.token);
      localStorage.setItem('user', JSON.stringify(body.user));
      dispatch({ type: 'LOGIN' });
      setRedirect('/');
    }).catch((err) => {
      err.json().then((res) => { setFormData({ ...formData, loginError: res.msg }); });
    });
  }

  const checkForErrors = () => {
    let isError = false;
    const errors = {};

    if (formData.username === '') {
      isError = true;
      errors.usernameError = 'Username is required';
    } else {
      errors.usernameError = '';
    }

    if (!formData.password) {
      isError = true;
      errors.passwordError = 'Password is required';
    } else {
      errors.passwordError = '';
    }

    setFormData({ ...formData, ...errors });

    return isError;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = checkForErrors();
    if (err) return;
    
    login({ username: formData.username, password: formData.password });
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  if (redirect) return <Navigate to={redirect} />

  return (
    <>  
      <h1>Login</h1>
      <Form error onSubmit={handleSubmit}>

        <Form.Field required>
          <label>Username</label>
          <input placeholder='Username' name='username' onChange={handleInputChange} />
          { formData.usernameError && <Message error header={formData.usernameError} /> }
        </Form.Field>

        <Form.Field required>
          <label>Password</label>
          <input placeholder='Password' name='password' type='password' onChange={handleInputChange} />
          { formData.passwordError && <Message error header={formData.passwordError} /> }
        </Form.Field>

        { formData.loginError && <Message error header={formData.loginError} /> }

        <Button positive floated='left' type='submit'>Login</Button>
      </Form>
    </>
  );
}

export default Login;
