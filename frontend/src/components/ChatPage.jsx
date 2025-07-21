import { setSelectedUser } from '@/redux/authSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';
import { useState } from 'react';

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const {messages} = useSelector(store=>store.chat)

  const sendMessageHandler = async (recieverId) =>{
    try {
      
  const res = await axios.post(`http://localhost:8000/app/v1/message/send/${recieverId}`,{
    textMessage},
    {
       headers: {
        'Content-Type': 'application/json'
       },
       withCredentials: true
    }
  );

  if(res.data.success)
  {
      dispatch(setMessages([...messages, res.data.newMessage]))
      setTextMessage('');
  }

    } catch (error) {
 console.log(error);
 
    }
  }
 
  useEffect(()=>{
    return () =>{
      dispatch(setSelectedUser(null));
    }
  })





  return (
    <div className='h-screen flex'>
      {/* Sidebar */}
      <section className='w-max min-w-[250px] px-4 py-3 overflow-y-auto h-full border-r border-gray-300'>
        <h1 className='font-bold mb-4 text-xl'>
          {user?.username}
          <hr className='mt-2 border-gray-300' />
        </h1>

        <div className='overflow-y-auto max-h-[calc(100vh-100px)]'>
          {suggestedUsers?.map((suggestedUser) => (
            <div
              onClick={() => dispatch(setSelectedUser(suggestedUser))}
              key={suggestedUser._id}
              className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer rounded'
            >
              <Avatar>
                <AvatarImage src={suggestedUser?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='font-medium'>{suggestedUser?.username}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Window */}
      {selectedUser ? (
        <section className='flex-1 flex flex-col h-full'>
          {/* Header */}
          <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span>{selectedUser?.username}</span>
            </div>
          </div>

          {/* Chat Messages Placeholder */}
          <div className='flex-1 overflow-y-auto p-4'>
            <Messages selectedUser={selectedUser} />

          </div>

          {/* Chat Input */}
          <div className='flex items-center p-4 border-t border-t-gray-300'>
            <Input
              value = {textMessage} 
              onChange={(e)=>setTextMessage(e.target.value)}
              type='text'
              className='flex-1 mr-2 focus-visible:ring-transparent'
              placeholder='Messages...'
            />
            <Button onClick={()=>sendMessageHandler(selectedUser?.recieverId)}  >Send</Button>
          </div>
        </section>
      ) : (
        <div className='flex-1 flex flex-col items-center justify-center'>
          <MessageCircleCode className='w-32 h-32 my-4' />
          <h1 className=' font-medium tex-xl'>Your Messages</h1>
          <span>Send a message to start a chat</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
