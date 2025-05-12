import { Outlet } from "react-router";

import { Sidebar } from "./sidebar/Sidebar";
import { MobileHeader } from "./header/MobileHeader";
import { Header } from "./header/Header";
import { Toaster } from "@/components/ui/sonner";

const PrimaryLayout = () => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <div className="lg:pl-64 h-full pt-14 lg:pt-0">
        <Header />
        <div className="px-5 py-10">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default PrimaryLayout;
