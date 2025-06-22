import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const addNewPost = async(req,res) =>{
    try {

        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        if(!image){
            return res.status(400).json({message: 'Image Required'});
        }

       // image upload
       const optimizedImageBuffer = await sharp(image.buffer).resize({width:800
        , height:800, fit: 'inside'}).toFormat('jpg',{quality:80}).toBuffer();
       
        // Here you would typically upload the optimizedImageBuffer to a cloud storage service

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}` // Example URI, replace with actual upload logic
          
      
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const post = await Post.create({    
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        }); 

      const user  = await User.findById(authorId)
       if(user){
        user.posts.push(post._id);
        await user.save();
       }
        
    await post.populate({path:'author', select: '-password'});

    return res.status(201).json({
        message: 'New post added',
        post,
        success: true
    })

    } catch (error) {
        console.log(error);
    }
}

export const getAllPost = async(req,res) => {
           try {
            
               const post = await Post.find().sort({createdAt: -1})
               .populate({path: 'author', select: 'username, profilePicture'})
               .populate({
                path: 'comments', 
                sort: {createdAt: -1}, 
                populate:{path:'author',select:'username, profilePicture'}
            });

            return res.status(200).json({
                posts,
                success: true
            })

           } catch (error) {
            console.log(error);
           }
}

export const getUserPost = async (req,res) => {
    try {
    
         const authorId = req.id;
         const posts = await Post.find({author: authorId}).sort({createdAt: -1})
         .populate({
            path: 'author',
            select: 'username, profilePicture'
         })
         .populate({
             path: 'comments', 
                sort: {createdAt: -1}, 
                populate:{path:'author',select:'username, profilePicture'}
         });

         return res.status(200).json({
            posts,
            success: true
         })
          
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req,res) =>{
    try {
        
        const likedBy = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
   
    if(!post) return res.status(404).json({
        message: 'Post not found',
        success: false
    })

    // Like logic here

    



    } catch (error) {
        console.log(error);
    }
    
}