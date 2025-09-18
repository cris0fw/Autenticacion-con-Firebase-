import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";
import Navbar from "../components/Navbar";

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
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
