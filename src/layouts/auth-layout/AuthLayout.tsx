import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div>
        <h3>Ini adalah Auth Layout</h3>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
