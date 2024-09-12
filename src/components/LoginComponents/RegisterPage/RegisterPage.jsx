import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { AbsoluteCenter, Link } from '@chakra-ui/react';

function RegisterPage() {
  const history = useHistory();

  return (
    <AbsoluteCenter>
      <RegisterForm />

      <center style={{marginTop: 10}}>
        <Link
          type="button"
          onClick={() => {
            history.push('/login');
          }}
        >
          Switch To Login
        </Link>
      </center>
    </AbsoluteCenter>
  );
}

export default RegisterPage;
