import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar,AvatarImage,AvatarFallback } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

const EditProfile = () => {
    const {user} = useSelector(store =>store.auth)
    const imageRef = useRef();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto : user?.profilePicture,
        bio : user?.bio,
        gender : user?.gender || 'Male'
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

   const fileChangeHandler = (e) => {
      const file = e.target.files?.[0];
      if(file){
        setInput({...input, profilePhoto:file})
      }
   }

   const selectChangeHandler = (value)=> {
        setInput({...input, gender:value})
   }




    

 const editProfileHandler = async ()=>{
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if(input.profilePhoto){
      formData.append("profilePhoto", input.profilePhoto);
    }
    try {
         
        setLoading(true);
        
        const res = await axios.post('http://localhost:8000/api/v1/user/profile/edit', formData,{
            headers:{
                'ContentType' : 'multipart/form-data'
            },
            withCredentials: true
        })
        if(res.data.success){
            const updatedUserData = {
                ...user, 
                bio : res.data.user?.bio,
                profilePicture: res.data.user?.profilePicture,
                gender: res.data.user?.gender
            };
            dispatch(setAuthUser(updatedUserData));
            navigate(`/profile/${user?._id}`)
            toast.success(res.data.message);
        }
    } catch (error) {
         console.log(error);
    }
    finally{
        setLoading(false);
    }
 }

  






  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-sl">Edit Profile</h1>

        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3">
                 <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" className="rounded-full" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        
          <div>
            <h1 className="font-bold text-sm">
            {user?.username}
            </h1>
            <span className="text-gray-600 text-sm">
              {user?.bio || "Bio here..."}
            </span>
          </div>
            </div>
           <input onChange={fileChangeHandler} ref ={imageRef} type='file' className="hidden"  />
           <Button onClick = {()=>imageRef?.current.click()}   className='bg-[#0095F6] h-8 hover:bg-[#318bc7]'>Change photo</Button>
        </div>
        <div>
            <h1 className="font-bold text-xl mb-2">Bio</h1>
            <Textarea value = {input.bio} onChange = {(e) => setInput({...input,bio: e.target.value})} name='bio' className='focus-visible:ring-transparent' />
        </div>
        <div>
            <h1 className="font-bold mb-2">Gender</h1>
            <Select value = {input.gender} onValueChange = {selectChangeHandler}>
  <SelectTrigger className="w-full">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="male">Male</SelectItem>
    <SelectItem value="female">Female</SelectItem>
   
  </SelectContent>
</Select>
        </div>
        <div className="flex justify-end">
            {
                 loading ? ( 
                <Button className='fit bg-[#0095f6] hover:bg-[#2a8ccd]'>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Please wait
                 </Button>
                 
                ): (
                     <Button onClick = {editProfileHandler}  className='fit bg-[#0095f6] hover:bg-[#2a8ccd]'>Submit</Button>
                )
            }
           
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
