import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../providers/AuthProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {(auth) => (
      <Route
        {...rest}
        render={(props) =>
          auth.admin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )}
  </AuthConsumer>
);
// force a change
export default ProtectedRoute;
