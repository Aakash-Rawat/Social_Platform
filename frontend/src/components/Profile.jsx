// import useGetUserProfile from '@/hooks/useGetUserProfile'
// import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Link, useParams } from 'react-router-dom'
// import { Button } from './ui/button'


// const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState('posts');

//   const {userProfile, user} = useSelector(store=>store.auth);
//   const isLoggedInUserProfile = user?._id === userProfile?._id;
//   const isFollowing = false;

//  const handleTabChange = (tab) => {
//     setActiveTab(tab);
//  }

//   const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

//   return (
//     <div className='flex max-w-5xl justify center mx-auto pl-10'>
//      <div className='flex flex-col gap-20 p-8'>
//      <div className='grid grid-cols-2'>
//       <section className='flex items-center justify-center'>
//            <Avatar className='h-32 w-32'>
//         <AvatarImage  src={userProfile?.profilePicture} alt='profilePhoto' className="h-full w-full object-cover rounded-full" />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//       </section>
//       <section>
//         <div className='flex flex-col gap-5'>
//           <div className='flex items-center gap-2'>
//            <span>{userProfile?.username}</span>
//             {isLoggedInUserProfile ? (
//               <>
//                <Link to ='/account/edit'> <Button variant="secondary" className="hover:bg-gray-200 h-8 text-sm px-3">Edit Profile</Button> </Link>
//                 <Button variant="secondary" className="hover:bg-gray-200 h-8 text-sm px-3">View Archieve</Button>
//                 <Button variant="secondary" className="hover:bg-gray-200 h-8 text-sm px-3">Ad tools</Button>
//               </>
//             ) : (
//               isFollowing ? (
//                 <>
//                   <Button variant="secondary" className="bg-[#0095F6] hover:bg-[#3192D2] h-8 text-sm px-3">Unfollow</Button>
//                   <Button variant="secondary" className="bg-[#0095F6] hover:bg-[#3192D2] h-8 text-sm px-3">Message</Button>
//                 </>
//               ) : (
//                 <Button variant="secondary" className="bg-[#0095F6] hover:bg-[#3192D2] h-8 text-sm px-3">Follow</Button>
//               )
//             )}
//           </div>
          
//           <div className='flex items-center gap-4'>
//             <p><span className='font-semibold'>{userProfile?.posts.length} </span> posts</p>
//             <p> <span className='font-semibold'>{userProfile?.followers.length}</span> followers</p>
//             <p> <span className='font-semibold'>{userProfile?.following.length}</span> following</p>
//           </div>
//            <div>
//             <span className='font-semibold'>{userProfile?.bio}</span>

//            </div>
//         </div>
//       </section>
//      </div>
//      <div className='border-t border-gray-200'>
//       <div className='flex items-center justify-center gap-60 text-sm'>
//              <span className={`py-3 cursor-pointer ${activeTab==='posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
//                    POSTS
//              </span>
//              <span className={`py-3 cursor-pointer ${activeTab==='saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
//                    SAVED
//              </span>
//       </div>

//       <div className='grid grid-cols-2 gap-4 p-4'>
//         {
//           displayedPost?.map((post)=>{
//             return (
//               <div key={post?._id} className='relative group cursor-pointer'>
//                 <img src={post.image} alt='postImage' className='rounded-sm my-2 w-full aspect-square object-cover' />
//               </div>
//             )
//           })
//         }
//       </div>

//      </div>
//      </div>
     
//     </div>
//   )
// }

// export default Profile


import useGetUserProfile from '@/hooks/useGetUserProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button } from './ui/button'

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 w-full">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 pb-10">
        {/* Avatar Section */}
        <div className="flex justify-center sm:justify-start">
          <Avatar className="h-32 w-32">
            <AvatarImage src={userProfile?.profilePicture} alt="profilePhoto" className="h-full w-full object-cover rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Info + Buttons Section */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-wrap items-center gap-4 text-lg">
            <span>{userProfile?.username}</span>
            {isLoggedInUserProfile ? (
              <>
                <Link to='/account/edit'>
                  <Button variant="secondary" className="hover:bg-gray-200 h-8 text-sm px-3">Edit Profile</Button>
                </Link>
                <Button variant="secondary" className="hover:bg-gray-200 h-8 text-sm px-3">View Archieve</Button>
                <Button variant="secondary" className="hover:bg-gray-200 h-8 text-sm px-3">Ad tools</Button>
              </>
            ) : (
              isFollowing ? (
                <>
                  <Button variant="secondary" className="bg-[#0095F6] hover:bg-[#3192D2] h-8 text-sm px-3">Unfollow</Button>
                  <Button variant="secondary" className="bg-[#0095F6] hover:bg-[#3192D2] h-8 text-sm px-3">Message</Button>
                </>
              ) : (
                <Button variant="secondary" className="bg-[#0095F6] hover:bg-[#3192D2] h-8 text-sm px-3">Follow</Button>
              )
            )}
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <p><span className="font-semibold">{userProfile?.posts.length}</span> posts</p>
            <p><span className="font-semibold">{userProfile?.followers.length}</span> followers</p>
            <p><span className="font-semibold">{userProfile?.following.length}</span> following</p>
          </div>

          <div className="text-sm">
            <span className="font-semibold">{userProfile?.bio}</span>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="border-t border-gray-200">
        <div className="flex items-center justify-center gap-10 sm:gap-20 text-sm font-medium">
          <span
            className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`}
            onClick={() => handleTabChange('posts')}
          >
            POSTS
          </span>
          <span
            className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`}
            onClick={() => handleTabChange('saved')}
          >
            SAVED
          </span>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {displayedPost?.map((post) => (
            <div key={post?._id} className="relative group cursor-pointer">
              <img
                src={post.image}
                alt="postImage"
                className="rounded-sm w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
