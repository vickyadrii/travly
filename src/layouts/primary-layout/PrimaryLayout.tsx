import { Outlet, useLocation } from "react-router";

import { Sidebar } from "./sidebar/Sidebar";
import { MobileHeader } from "./header/MobileHeader";
import { Header } from "./header/Header";
import { Toaster } from "@/components/ui/sonner";

const PrimaryLayout = () => {
  const location = useLocation();

  console.log(location)
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <div className="lg:pl-64 h-full pt-14 lg:pt-0">
        <Header />
        <div className="h-full p-5">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default PrimaryLayout;
