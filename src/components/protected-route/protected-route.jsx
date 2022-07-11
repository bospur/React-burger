import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth/useAuth";

const ProtectedRoute = ({ children, ...rest }) => {
    const {isAuth} = useAuth();
    

  return (
    <Route
        {...rest}
        render={({ location }) => 
            isAuth ? (children) : ( <Redirect to={{ pathname: "/login", state: { from: location } }} /> )
        }
    />
  );

};

export default ProtectedRoute;
