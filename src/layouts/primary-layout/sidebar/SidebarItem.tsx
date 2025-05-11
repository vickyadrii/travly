import { Link, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import type { SidebarItemType } from "@/types";

export const SidebarItem = ({ label, href, icon }: SidebarItemType) => {
  const location = useLocation();
  const isActiveSidebar = location.pathname === href;
  console.log(location);

  return (
    <div>
      <Button variant={isActiveSidebar ? "active-sidebar" : "ghost"} className="justify-start h-[52px] w-full hover:translate-x-1 transition-all duration-300 ease-out" asChild>
        <Link to={href} className={`${isActiveSidebar ? 'text-sky-700' : 'text-gray-600'} flex items-center gap-2`}>
          {icon}
          <span className="text-sm font-extrabold">{label}</span>
        </Link>
      </Button>
    </div>
  );
};
