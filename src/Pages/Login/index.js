import React, {useState} from 'react';
import {Button, Grid} from '@material-ui/core';
import './styles.scss';
import {useForm} from 'react-hook-form';
import Textbox from '../../components/Textbox';
import {useHistory} from 'react-router-dom';
import ErrorMesssage from '../../components/ErrorMessage/index.js';

const Login = (props) => {
  const [errMsg, setErrMsg] = useState('');
  const Auth = {
    user: 'demo',
    password: 'demo',
  };
  const {register, handleSubmit, errors} = useForm({
    mode: 'onBlur',
  });

  let history = useHistory();
  const login = (vals) => {
    const {user, password} = vals;
    if (user === Auth.user && password === Auth.password) {
      history.push('/home');
    } else setErrMsg('Invalid credentials. Try again or contact support');
  };
  return (
    <Grid container justify="center" id="login-page">
      <Grid item md={4} xs={12} className="contain">
        <h1>Login</h1>
        <h3>Login to get the latest flight updates</h3>
        {errMsg !== '' && <ErrorMesssage message={errMsg} />}
        <form className="pt-3" onSubmit={handleSubmit(login)}>
          <Textbox
            type="text"
            label="User"
            placeholder="Enter User ID"
            name="user"
            error={errors.user && errors.user.message}
            boxClasses="pb-4"
            customRef={register({
              required: 'This field is required',
            })}
          />
          <Textbox
            type="password"
            label="Password"
            placeholder="Enter Password"
            name="password"
            error={errors.password && 'This field is required'}
            boxClasses="pb-4"
            customRef={register({
              required: true,
            })}
          />

          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
