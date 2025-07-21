/*import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div>
      <LeftSidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
*/


// Above code is without responsive design backup if by anychance something happens to current code

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import BottomNavbar from "./BottomNavbar";
import CreatePost from "./CreatePost";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex w-full">
        {/* Left Sidebar - visible on sm and above */}
        <div className="hidden sm:block w-60 h-screen sticky top-0 ">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1  w-full px-4 sm:px-6 lg:px-8 mt-4 mb-16 sm:mb-0 overflow-y-auto">
          <Outlet />
        </main>

        {/* Right Sidebar - visible on lg and above */}
        <div className="hidden lg:block w-64 h-screen sticky top-0 pr-4 pt-4 overflow-y-auto">
          <RightSidebar />
        </div>
      </div>

      {/* Bottom Navbar for mobile */}
      <BottomNavbar onCreate={() => setOpen(true)} />
      <CreatePost open={open} setOpen={setOpen} />
    </>
  );
};

export default MainLayout;
