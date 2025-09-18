import React from "react";
import { Route, Routes } from "react-router";
import RootLayout from "./layouts/root.layout";
import PublicLayout from "./layouts/public.layout";
import AdminLayout from "./layouts/admin.layout";
import AuthLayout from "./layouts/auth.layout";
import Home from "./pages/public/Home";
import Dashboard from "./pages/private/Dasboard";
import Profile from "./pages/private/Profile";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import NotFound from "./pages/public/NotFound";

// CONFIGURACION RUTAS
const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route element={<Home />} index />
          <Route element={<NotFound />} path="*" />
        </Route>
        {/* Private */}
        <Route path="admin" element={<AdminLayout />}>
          <Route element={<Dashboard />} index />
          <Route element={<Profile />} path="profile" />
        </Route>
        {/* Auth */}
        <Route path="auth" element={<AuthLayout />}>
          <Route element={<Register />} path="register" />
          <Route element={<Login />} path="login" />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
