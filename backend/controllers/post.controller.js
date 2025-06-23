import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

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

    await post.updateOne({$addToSet: {like : likedBy}})
    await post.save();
    

    // implement socket io for real time notification


    return res.status(200).json({
        message: 'Post liked',
        success: true
    })

    } catch (error) {
        console.log(error);
    }
    
}
export const dislikePost = async (req,res) =>{
    try {
        
        const likedBy = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
   
    if(!post) return res.status(404).json({
        message: 'Post not found',
        success: false
    })

    // Like logic here

    await post.updateOne({$pull: {like : likedBy}})
    await post.save();
    

    // implement socket io for real time notification


    return res.status(200).json({
        message: 'Post disliked',
        success: true
    })

    } catch (error) {
        console.log(error);
    }
    
}

export const addComment = async (req,res) =>{
    try {
        
     const postId = req.params.id;
     const commentedBy  = req.id;

          const {text} = req.body;
          const post = await Post.findById(postId);
          
          if(!text)
          {
            return res.status(400).json({
                message: 'text is required',
                success: false
            })
          }
        
          const comment = await Comment.create({
            text,
            author: commentedBy,
            post: postId
          }).populate({
            path: 'author',
            select: 'username, profilePicture'
          });

          post.comments.push(comment._id);
          post.save();

          return res.status(201).json({
            message: 'Comment added',
            success: true
          })


    } catch (error) {
         console.log(error);
    }
}


export const getCommentsOfPost = async(req,res) =>{
    try {
        
    const postId = req.params.id;

    const comments = Comment.find({post: postId}).populate('author','username, prpfilePicture');

    if(!commnets) 
        {
            return res.status(404).json({
        message: 'No Comments',
        success: false
    })
}

    
  return res.status(200).json({
    success: true,
    comments
  })
    
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async(req,res) =>{

    try {
        
   const postId =  req.params.id;
   const authorId = req.id;

   const post = await Post.findById(postId);

   if(!post)
   {
     return res.status(404).json({
        message: 'Post not found',
        success: false
     })
   }

   // check if the loggedIn user is the owner of the post
   
   if(post.author.toString() !== authorId)
   {
    return res.status(403).json({
        message: 'Unauthorized'
    })
   }


   // delete post

   await Post.findByIdAndDelete(postId);

    // remove postId from user's post

    let user = await User.findById(authorId);

    // below line is for updating posts after deleting so that it gives all the post except for the one that is deleted
    user.posts = user.posts.filter(id=> id.toString() !== postId)
    
    await user.save();

    // delete associated comments

     await Comment.deleteMany({post: postId})

       return res.status({
        message: 'Post deleted',
        success: true
       })


    } catch (error) {
         console.log(error)
    }
}

export const bookmarkPost = async(req,res) => {
    try {
        
       const postId = req.params.id;
       const authorId = req.id;

       const post = await Post.findById(postId);

       if(!post)
       {
          return res.status(404).json({
            message: 'Post not found',
            success: false
          })
       }

       const user = await User.findById(authorId);
       if(user.bookmarks.includes(post._id)){
          
        // already bookmarked
          await user.updateOne({$pull:{bookmarks: post,_id}});
          await user.save();
          return res.status(200).json({type: 'unsaved', message: 'Post removed from bookmarked',success: true})
       }
       else{
              // bookmarking

              await user.updateOne({$addToSet:{bookmarks: post,_id}});
          await user.save();
          return res.status(200).json({type: 'saved', message: 'Post bookmarked',success: true})
       }

    } catch (error) {
         
        console.log(error)
    }
}