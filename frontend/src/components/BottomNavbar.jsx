// BottomNavbar.jsx
import {
  Home,
  Heart,
  Search,
  PlusSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BottomNavbar = ({ onCreate }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center h-14 shadow-sm">
      <Home className="cursor-pointer" onClick={() => navigate("/")} />
      <Search className="cursor-pointer" />
      <PlusSquare className="cursor-pointer" onClick={onCreate} />
      <Heart className="cursor-pointer" />
      <div onClick={() => navigate("/profile")} className="cursor-pointer">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default BottomNavbar;
