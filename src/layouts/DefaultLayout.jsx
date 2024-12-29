import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col h-full w-full bg-red-50 px-4">
        <Navbar />

        <div className="h-[100vh] border-t-2 w-full overflow-auto my-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
