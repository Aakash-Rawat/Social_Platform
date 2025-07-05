import { Dialog, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useState } from "react";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";
import { useDispatch } from "react-redux";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [like, setLike] = useState(Array.isArray(post.likes)&&(user?._id)? post.likes.includes(user._id) : false);
const [postLike, setPostlike] = useState(Array.isArray(post.likes) ? post.likes.length : 0);


  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const deletePostHandler = async ()=>{
    try {
       
       const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, {withCredentials:true});

       if(res.data.success)
       {    
        const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
        // Update the posts in the Redux store
        dispatch(setPosts(updatedPostData));
        setOpen(false); // Close the dialog if it was open
           toast.success(res.data.message);
       }


    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message)
    }
  }

 const likeOrDislikeHandler = async () => {
    try { 
            const action = like ? 'dislike' : 'like';
          const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, {withCredentials:true});
          if(res.data.success)
          {    

             const updatedLikes = like?postLike-1: postLike+1;
              setPostlike(updatedLikes);
              setLike(!like);
             toast.success(res.data.message);
          }

    } catch (error) {
      console.log(error); 
    }
  }






  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_Image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Add to favorites
            </Button>
            {
            
            user && user?._id === post?.author._id && (
              <Button onClick={deletePostHandler} variant="ghost" className="cursor-pointer w-fit ">
                Delete
              </Button>
            )
            }
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post.image}
        alt="post_img"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaRegHeart
            onClick={likeOrDislikeHandler}
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
          <MessageCircle
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">{postLike}</span>
      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.caption}
      </p>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer text-sm text-gray-400"
      >
        View all 10 comments
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
