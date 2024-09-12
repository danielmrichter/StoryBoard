import React from 'react';
import LoginForm from '../LoginForm';
import { useHistory } from 'react-router-dom';
import { AbsoluteCenter, Link } from '@chakra-ui/react';

function LoginPage() {
  const history = useHistory();

  return (
    <AbsoluteCenter>
      <LoginForm />

      <center style={{marginTop: 10}}>
        <Link
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Switch To Register
        </Link>
      </center>
    </AbsoluteCenter>
  );
}

export default LoginPage;
