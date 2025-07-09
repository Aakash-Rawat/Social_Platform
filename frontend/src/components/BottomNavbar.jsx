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

const BottomNavbar = () => {
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
      toast.error(error.response?.data?.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    }
  };

  const sidebarItems = [
    { icon: <Home size={22} />, text: "Home" },
    { icon: <Search size={22} />, text: "Search" },
    { icon: <PlusSquare size={22} />, text: "Create" },
    { icon: <Heart size={22} />, text: "Notifications" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
            >
              {item.icon}
              {/* Optionally show text below icon (very small screens) */}
              {/* <span className="text-[10px] mt-1">{item.text}</span> */}
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </>
  );
};

export default BottomNavbar;
