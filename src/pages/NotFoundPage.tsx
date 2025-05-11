import { CircleX } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="fixed bg-white h-screen z-10 w-full left-0 top-0 flex items-center justify-center">
      <div className="flex items-center  gap-2 text-sky-800">
        <CircleX />
        <span className="font-extrabold">Oops. Halaman tidak ditemukan!</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
