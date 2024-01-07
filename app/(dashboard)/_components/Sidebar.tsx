import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="p-6 flex items-center gap-x-2">
        <Logo />
        <span className="text-[#007DFC] text-2xl font-sans font-bold cursor-default">
          InsightQ
        </span>
      </div>
      <div className="flex flex-col w-full mt-2.5">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
