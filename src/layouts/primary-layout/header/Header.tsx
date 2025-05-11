export const Header = () => {
  return (
    <div className="px-4 py-2.5 border-b w-full flex justify-end">
      <button className="flex items-center gap-3 hover:bg-accent active:bg-white p-2 rounded transition-all duration-300 ease-out cursor-pointer">
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-extrabold">Vicky Adri</h3>
          <p className="text-xs text-gray-600 font-medium">Hello, welcome back!</p>
        </div>
      </button>
    </div>
  );
};
