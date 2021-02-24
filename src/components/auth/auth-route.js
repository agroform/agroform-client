import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const authRoute = (props) => {
  if(!props.user) {
     return <Route {...props} />
  }
  return <Redirect to='/' />
}

export default authRoute;
