import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/common/Sidebar';
import Navbar from '@/components/common/Navbar';

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col h-full w-screen">
        <Navbar />
        <div
          className="h-[100vh]  overflow-auto  px-4 bg-[#4bddc0] shadow-md"
          style={{
            width: !collapsed ? '81.5vw' : '94.6vw',
            maxHeight: 'full', // Giới hạn chiều cao
            overflow: 'auto', // Cho phép cuộn
            backgroundColor: '',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
