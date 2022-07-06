import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth/useAuth";

const ProtectedRoute = ({ children, ...rest }) => {
    const {isAuth} = useAuth();

  return (
    <Route
        {...rest}
        render={() => 
            isAuth ? (children) : ( <Redirect to='/login' /> )
        }
    />
  );

};

export default ProtectedRoute;
