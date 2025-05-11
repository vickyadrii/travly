import { Route, Routes } from "react-router";
import { SignInPage, RegisterPage } from "@/pages";
import { AuthLayout, PrimaryLayout } from "@/layouts";
import PrivateRoutes from "./PrivateRoutes";

const Routers = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<PrimaryLayout />}>
        <Route path="/*" element={<PrivateRoutes />} />
      </Route>
    </Routes>
  );
};

export default Routers;
