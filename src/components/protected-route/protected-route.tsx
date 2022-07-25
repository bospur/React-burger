import React, { FC } from "react";
import { ReactNode } from "react";
import { Redirect, Route} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth/useAuth";

interface IProtected {
  children: ReactNode;
  path: string;
}
const ProtectedRoute: FC<IProtected> = ({ children, ...rest }) => {
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
