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
import BottomNavbar from "./BottomNavbar";
import CreatePost from "./CreatePost";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar for desktop */}
      <LeftSidebar />

      {/* Bottom navbar for mobile */}
      <BottomNavbar onCreate={() => setOpen(true)} />
      <CreatePost open={open} setOpen={setOpen} />

      {/* Main content with responsive margins */}
      <main className="sm:ml-20 md:ml-44 lg:ml-56 mb-14 sm:mb-0 p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
