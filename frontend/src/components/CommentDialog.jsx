import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent } from "./ui/dialog";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen }) => {
  const [text,setText] = useState("");
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

const sendMessageHandler = async () => {
     alert(text);
}


  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className={'p-0 flex flex-col'} style={{ maxWidth: "64rem" }}>
        <div className="flex flex-1">
           <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1482015527294-7c8203fc9828?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="post_img"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        <div className="w-1/2 flex flex-col justify-between">
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-3 items-center">
               <Link>
               <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Link>
            <div>
              <Link className="font-semibold text-xs">username</Link>
              {/* <span className="text-gray-600 text-sm">Bio here</span> */}
            </div>
           
            </div>
            
          </div>
          <hr />
          <div className="flex-1 overflow-y-auto max-h-96 p-4">
           comments here
          </div>
          <div className="p-4">
              <div className="flex items-center gap-2">
                <input value={text} onChange={changeEventHandler} type="text" placeholder="Add a comment..." className="w-full outline-none border border-gray-300 p-2 rounded" />
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
