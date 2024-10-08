import { Button, FormControl, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Heading className='loginHeader' as='h2'>Register User</Heading>
      {errors.registrationMessage && (
        <Heading as='h4' className="alert" role="alert">
          {errors.registrationMessage}
        </Heading>
      )}
      <div >
        <FormLabel htmlFor="username">
          Username:
          <Input
            variant='filled'
            type="text"
            id="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="password">
          Password:
          <Input
          variant='filled'
            type="password"
            id="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormLabel>
      </div>
      <div>
        <Button className="btn" type="submit" name="submit" value="Register">Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
