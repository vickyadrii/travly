import { MobileSidebar } from "../sidebar/MobileSidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-14 flex items-center bg-sky-500 border-b fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};
