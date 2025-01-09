import {  useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}  />
      <div className="flex flex-col h-full w-screen">
        <Navbar  />
        <div className="h-[100vh]  border-t-2 overflow-auto bg-[#e5e7e9]  px-4"
        style={{
            width: !collapsed ? '81.5vw' : '94.6vw',
            maxHeight: "full", // Giới hạn chiều cao
            overflow: "auto", // Cho phép cuộn
          }}
        >
        
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
