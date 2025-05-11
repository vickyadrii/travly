import { Toaster } from "@/components/ui/sonner";
import { getAccessToken } from "@/lib/utils";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const jwtToken = getAccessToken();

  return jwtToken ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex items-center gap-2">
          <img
            src="/assets/images/logo.webp"
            alt="travel logo, copyright by vecteezy.com"
            className="w-12 h-12 object-cover"
          />
          <h3 className="text-sm font-extrabold text-sky-800">Travly</h3>
        </div>
        <div className="max-w-2xl mx-auto p-5 w-full">
          <div className="bg-white px-12 py-6 border border-gray-100 shadow rounded-lg space-y-8">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          classNames: {
            description: "!text-slate-800",
          },
        }}
      />
    </div>
  );
};

export default AuthLayout;
