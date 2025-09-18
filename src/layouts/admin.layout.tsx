import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";
import Navbar from "../components/Navbar";
import { Suspense } from "react";

// CONFIGURACION DE RUTAS EN RUTAS ADMIN
const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  //Mostrar loading mientras se verifica el estado de inicio de sesion
  if (status === "loading" || !hasEmitted) {
    return <div>loading...</div>;
  }

  // Redirigir si el usuario no esta autenticado
  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Suspense fallback={<div>loading user...</div>}>
      <AuthenticatedLayout />
    </Suspense>
  );
};

export default AdminLayout;

//USO SUSPENSE COMO PARA QUE EN LA PAGINA DE DASHBOARD AL PONER ESTO USER?.DISPLAYNAME
//SE USE SIN ? Y ESTE ASI USER.DISPLAY YA QUE ESTARIA VALIDADO ESTARIA HACIANDO UNA
//ESPERA HASTA QUE EL USUARIO CARGUE
const AuthenticatedLayout = () => {
  useUser({
    suspense: true,
  });
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
