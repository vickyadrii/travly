import { Link } from "react-router";
import { cn } from "@/lib/utils";

import { SidebarItems } from "@/constants";

import { SidebarItem } from "./SidebarItem";
import SignOut from "./SignOut";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn("flex h-full lg:w-64 lg:fixed left-0 top-0 border-r-2 flex-col justify-between", className)}>
      <div className="flex flex-col">
        <div className="flex px-4 py-3 border-b w-full">
          <Link to="/" className="flex items-center justify-center gap-2">
            <img
              src="/assets/images/logo.png"
              alt="travel logo, copyright by vecteezy.com"
              className="w-12 h-12 object-cover"
            />
            <h3 className="text-sm font-extrabold text-sky-800">Travly</h3>
          </Link>
        </div>

        <div className="flex flex-col gap-y-2 w-full px-4 py-4 h-screen">
          {SidebarItems.map((data, index) => (
            <SidebarItem key={index} icon={<data.icon />} href={data.href} label={data.label} />
          ))}
          <SignOut />
        </div>
      </div>
    </div>
  );
};
