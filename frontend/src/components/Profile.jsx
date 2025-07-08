import useGetUserProfile from '@/hooks/useGetUserProfile'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const {userProfile} = useSelector(store=>store.auth);
  return (
    <div>
      <Avatar>
        <AvatarImage>

        </AvatarImage>
      </Avatar>
    </div>
  )
}

export default Profile
