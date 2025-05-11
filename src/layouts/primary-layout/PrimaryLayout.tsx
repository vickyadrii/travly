import { Outlet } from "react-router";

import { Sidebar } from "./sidebar/Sidebar";
import { MobileHeader } from "./header/MobileHeader";
import { Header } from "./header/Header";

const MainLayout = () => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-64 h-full pt-14 lg:pt-0">
        <Header />
        <div className="h-full p-5">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
