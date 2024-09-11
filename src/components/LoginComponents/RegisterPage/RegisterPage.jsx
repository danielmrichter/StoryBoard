import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Link } from '@chakra-ui/react';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
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
    </div>
  );
}

export default RegisterPage;
