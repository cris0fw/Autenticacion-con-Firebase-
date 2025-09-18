import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

// CONFIGURACION EN RUTAS REGISTER Y LOGIN
const AuthLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  // Mostrar loading mientras se verifica el estado de inicio de session
  if (status === "loading" || !hasEmitted) {
    return <div>loading...</div>;
  }

  //Redirigir si el usuario ya esta autenticado
  if (status === "success" && signInCheckResult.signedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
