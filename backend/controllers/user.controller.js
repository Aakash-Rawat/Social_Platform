import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";


// Registering User
export const register = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
          return res.status(401).json({
              message: "Something is missing, please check!",
              success: false,
          });
      }
      const user = await User.findOne({ email });
      if (user) {
          return res.status(401).json({
              message: "Try different email",
              success: false,
          });
      };
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
          username,
          email,
          password: hashedPassword
      });
      return res.status(201).json({
          message: "Account created successfully.",
          success: true,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
  }



// Login User
export const login = async (req,res) =>{
    try {
        const {  email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check",
        success: false,
      });
    }

    let user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message: "User doesn't exist",
            success: false
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        };

      user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        posts: user.posts,

      }

      const token =  jwt.sign({userId: user._id},process.env.SECRET_KEY,{expiresIn: '1d'})
      return res.cookie('token',token,{httpOnly:true, sameSite:'strict', maxAge: 1*24*60*60*1000}).json({
        message: `Welcome Back ${user.username}`,
        success: true,
        user
      });

    } catch (error) {
        console.log(error);
        
    }
}

//Log Out
export const logout = async (_,res)=>{
       try {
             return res.cookie('token',"", {maxAge:0}).json({
                message: "Logged Out Successfully",
                success: true
             });
        
       } catch (error) {
        console.log(error);
        
       }
}


// Opening Profile
export const getProfile = async (req,res)=>{
       try {
        
             const userId = req.params.id;
             let user = await User.findById(userId).select('-password');
             return res.status(200).json({
                user,
                success: true
             })
       } catch (error) {
        console.log(error);
        
       }
}

//Edit profile
export const editProfile = async (req,res)=>{
         try {
            
            const userId = req.id;
            const {bio,gender} = req.body;
            const profilePicture = req.file;
            let cloudResponse;
            if(profilePicture){
              const fileUri = getDataUri(profilePicture);
             cloudResponse =  await cloudinary.uploader.upload(fileUri);
            }
           
            const user = await User.findById(userId).select("-password");
              if(!user){
                return res.status(404).json({
                  message: "User not found",
                  success: false
                })
              }
            
              if(bio){
                user.bio = bio;
              }

              if(gender){
                user.gender = gender;
              }

              if(profilePicture){
                user.profilePicture = cloudResponse.secure_url;
              }

              await user.save();
             return res.status(200).json({
              message: "Profile Updated",
              success : true,
              user
             })

            
         } catch (error) {
            console.log(error)
            
         }
}

// Follow & Unfollow
export const followOrUnfollow = async (req,res)=>{
  try {
     
       const followBy = req.id;
       const followTo = req.params.id;
       if(followBy===followTo){
          return res.status(400).json({
            message: 'You cannot follow/unfollow yourself',
            success: false
          })
       } 
        
       const user = await User.findById(followBy);
       const targetUser = await User.findById(followTo);

       if(!user || !targetUser ){
          return res.status(400).json({
            message: 'User not',
            success: false
          })
       }
      
       const isFollowing = user.following.includes(followTo);

       if(isFollowing){
        await Promise.all([
          User.updateOne({_id: followBy},{$pull:{following: followTo}}),
          User.updateOne({_id: followTo},{$pull:{followers: followBy}})
         ])
         return res.status(200).json({message: 'Unfollow successfully', sccess: true});
       }
       else{
             await Promise.all([
              User.updateOne({_id: followBy},{$push:{following: followTo}}),
              User.updateOne({_id: followTo},{$push:{followers: followBy}})
             ])
             return res.status(200).json({message: 'Followed successfully', sccess: true});
       } 

  } catch (error) {
    console.log(error);
    
  }
}

