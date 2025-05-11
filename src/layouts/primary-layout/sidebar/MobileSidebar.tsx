import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { AlignLeft } from "lucide-react";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignLeft className="text-white" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 z-[100]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
