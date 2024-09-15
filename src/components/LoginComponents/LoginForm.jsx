import { Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Heading className='loginHeader' as='h2'>Login</Heading>
      {errors.registrationMessage && (
        <Heading as='h4' className="alert" role="alert">
          {errors.registrationMessage}
        </Heading>
      )}
      <div>
        <FormLabel htmlFor="username">
          Username:
          <Input
            type="text"
            id="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="password">
          Password:
          <Input
            type="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormLabel>
      </div>
      <div>
        <Button className="btn" type="submit" name="submit">Log In</Button>
      </div>
    </form>
  );
}

export default LoginForm;
