import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({component: Component, user, ...rest}) => {
    return (
      <Route
        {...rest}
        render={props => {
            if (user === undefined) {
              return (<div>loading</div>);
            }

            if (user) {
              return <Component {...props} loggedInUser={user}/>
            }

            return <Redirect to={{pathname: '/', state: {from: props.location}}} />
          }
        }
      />
    )
}
export default protectedRoute;