import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const sessionId = "12345";

  return sessionId ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
