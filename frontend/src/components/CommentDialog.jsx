import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent } from "./ui/dialog";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {
  const [text,setText] = useState("");
   const {selectedPost} = useSelector((store) => store.post);
  const { posts } = useSelector((store) => store.post);
  const [comment, setComments] = useState([]);
 

  useEffect(() => {
    if (selectedPost) {
      setComments(selectedPost.comments);
    }
  }, [selectedPost]);


  
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

 const sendMessageHandler = async ()=>{
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost._id}/comment`,{text},{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
      });

      if(res.data.success)
      {
          const updatedCommentData = [...comment, res.data.comment];
          setComments(updatedCommentData);

          const updatePostData = posts.map((p) =>
            p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
          );
               
          dispatch(setPosts(updatePostData));
        toast.success(res.data.message);
        setText(""); // Clear the input field after posting the comment
      }
      
    } catch (error) {
       console.log(error);
    }
  }



  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className={'p-0 flex flex-col'} style={{ maxWidth: "64rem" }}>
        <div className="flex flex-1">
           <div className="w-1/2">
          <img
            src={selectedPost?.image}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        <div className="w-1/2 flex flex-col justify-between">
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-3 items-center">
               <Link>
               <Avatar>
              <AvatarImage src={selectedPost?.author?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Link>
            <div>
              <Link className="font-semibold text-xs">{selectedPost?.author?.username}</Link>
              {/* <span className="text-gray-600 text-sm">Bio here</span> */}
            </div>
           
            </div>
            
          </div>
          <hr />
          <div className="flex-1 overflow-y-auto max-h-96 p-4">
            {
              comment.map((comment)=> <Comment key ={comment._id} comment={comment} />)
            }
          
          </div>
          <div className="p-4">
              <div className="flex items-center gap-2">
                <input value={text} onChange={changeEventHandler} type="text" placeholder="Add a comment..." className="w-full text-sm outline-none border border-gray-300 p-2 rounded" />
                <Button disabled={!text.trim()} onClick={sendMessageHandler} className={'text-blue-600'} variant={'outline'}>
                  Post
                </Button>
              </div>
          </div>
        </div>
        </div>
       
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
