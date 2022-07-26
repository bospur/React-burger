import React, { FC } from "react";
import { ReactNode } from "react";
import { Redirect, Route, RouteProps} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth/useAuth";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const {isAuth} = useAuth();

  return (
    <Route
        {...rest}
        render={({ location }) => 
            isAuth ? (children) : ( <Redirect to={{ pathname: "/login", state: { from: location } }} /> ) as any
        }
    />
  );

};

export default ProtectedRoute;
