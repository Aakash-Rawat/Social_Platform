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
      <div className="flex">
        {/* Left Sidebar - only visible on sm and above */}
        <LeftSidebar />

        {/* Main Content */}
        <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-16 sm:mb-0">
          <Outlet />
        </main>

        {/* Right Sidebar - only visible on lg and above */}
        <div className="hidden lg:block w-64 pr-4 pt-4">
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

