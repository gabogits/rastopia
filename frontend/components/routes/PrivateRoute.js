import React, { useEffect } from "react";
import useAuth from "../../context/authState";
import Router from "next/router";

export function PrivateRoute(Component) {
  return () => {
    const { auth, loadingUser } = useAuth();
    useEffect(() => {
      if (!auth && !loadingUser) Router.push("/iniciar-sesion");
    }, [loadingUser, auth]);
    return <Component {...arguments} />;
  };
}

export default PrivateRoute;
