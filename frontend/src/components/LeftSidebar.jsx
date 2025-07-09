import {
  Home,
  Heart,
  Search,
  LogOut,
  PlusSquare,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice.js";
import CreatePost from "./CreatePost";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    }
    else if(textType === 'Profile'){
      navigate(`/profile/${user?._id}`)
    }
    else if(textType === 'Home'){
      navigate('/')
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "logout" },
  ];

  return (
    <div className="hidden sm:flex flex-col fixed top-0 left-0 h-screen w-20 md:w-44 lg:w-56 border-r border-gray-300 px-2 sm:px-4 py-6 bg-white z-10">
      <h1 className="mb-8 text-center text-xl font-bold">READOMO</h1>
      <div className="space-y-2">
        {sidebarItems.map((item, index) => (
          <div
            onClick={() => sidebarHandler(item.text)}
            key={index}
            className="flex items-center gap-3 hover:bg-gray-100 cursor-pointer rounded-lg px-3 py-2"
          >
            <div className="text-lg">{item.icon}</div>
            <span className="hidden md:inline text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;













// LeftSidebar code without responsive design for backup

// import {
//   Home,
//   Heart,
//   Search,
//   LogOut,
//   PlusSquare,
//   MessageCircle,
//   TrendingUp,
// } from "lucide-react";
// import React from "react";
// import { toast } from "sonner";
// import axios from "axios";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuthUser } from "@/redux/authSlice.js";
// import { useState } from "react";
// import CreatePost from "./CreatePost";


// const LeftSidebar = () => {
//   const navigate = useNavigate();

//   const {user} = useSelector(store=>store.auth);

//    const dispatch = useDispatch();

//    const [open,setOpen] = useState(false);


//     const logoutHandler = async () =>{
//         try {
            
//          const res = await axios.get('http://localhost:8000/api/v1/user/logout', {withCredentials:true});
//          if(res.data.success)
//          {   
//             dispatch(setAuthUser(null));
//             navigate('/login');
//             toast.success(res.data.message);
//          }

//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }



// const sidebarHandler = (textType) =>{
//          if(textType == 'logout')
//          {    
//             logoutHandler();
//          }

//          else if(textType == 'Create')
//          {
//             setOpen(true);
//          }
// }

// const sidebarItems = [
//   { icon: <Home />, text: "Home" },
//   { icon: <Search />, text: "Search" },
//   { icon: <TrendingUp />, text: "Explore" },
//   { icon: <MessageCircle />, text: "Messages" },
//   { icon: <Heart />, text: "Notifications" },
//   { icon: <PlusSquare />, text: "Create" },
//   {
//     icon: (
//       <Avatar className='w-6 h-6'>
//         <AvatarImage src={user?.profilePicture} />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//     ),
//     text: "Profile",
//   },

//   { icon: <LogOut />, text: "logout" },
// ];

//   return (
//     <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
//       <div className="flex flex-col">
//         <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
//         <div>
//           {sidebarItems.map((item, index) => {
//             return (
//               <div onClick={() => sidebarHandler(item.text)} key={index} className="flex item-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 m-3">
//                 {item.icon}
//                 <span>{item.text}</span>
//               </div>
//             );
//           })
//           }
//         </div>
//       </div>

//       <CreatePost open = {open} setOpen={setOpen}/>
//     </div>
//   );
// };

// export default LeftSidebar;

