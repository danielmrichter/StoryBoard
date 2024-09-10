import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginComponents/LoginForm'
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ProtectedRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);
  const history = useHistory()

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.id ?
        // If the user is logged in, show the protected component
        <ProtectedComponent />
        :
        // Otherwise, redirect to the Loginpage
        history.push('/login')
      }
    </Route>
  );
}

export default ProtectedRoute;
