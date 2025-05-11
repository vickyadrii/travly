import { getAccessToken } from "@/lib/utils";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const jwtToken = getAccessToken();

  return jwtToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
