import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res)=>{
    const {page} = req.query
    try {
        const LIMIT = 8;
        const startIndex = (Number(page)-1) * LIMIT;
        // This gives us the starting index of each page
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);


        res.status(200).json({data:posts, currentPage:Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getPostsBySearch = async(req,res) => {
    const {searchQuery, tags} = req.query;
    // console.log(searchQuery,tags)
    try {
        const title = new RegExp(searchQuery, 'i');
        // i stands for ignore case means 
        // TEST test Test will be taken in as test
        const posts = await PostMessage.find({
            $or:[{title},{tags:{$in:tags.split(',')}}]
        });
        // console.log(posts)
        
        // or means either find me the title or find me the tags
        // in means is there a tag in our tags that matches the query
        res.json({data:posts})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const createPost = async (req,res)=>{
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId, createdAt:new Date().toISOString()});

    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        console.log(error)
        res.status(409).json({message:error.message})
    }
}

// export const updatePost=async(req,res)=>{
//     const {id:_id}=req.params;
//     const post=req.post;

//     if(!mongoose.Types.ObjectId.isValid(_id))
//         res.status(404).send("No post with that id");
//     const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post, _id},{new:true});

//     res.json(updatedPost);
// }
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async(req, res)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    await PostMessage.findByIdAndRemove(id)

    res.json({message:"Post deleted succesfully"});
}

export const likePost = async (req,res) =>{
    const {id} = req.params;

    if(!req.userId) 
        return res.json({message: 'Unauthenticated'})
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);
    
    const index = post.likes.findIndex((id)=> id=== String(req.userId));
    // Each like is an id from a specific person if an id is already present then this person has already liked once and now is going to dislike
    // If find func finds nothing then the value will be '-1' which means that this person is going to like
    if(index === -1)
    {
        // Like the post
        post.likes.push(req.userId)
    }
    else{
        // Dislike a post
        post.likes=post.likes.filter((id)=>id!==String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new:true});

    // The post is being updated in the if-else block

    res.json(updatedPost);

}

export const getPost = async(req, res) =>{
    const {id} = req.params;

    try{
        const post = await PostMessage.findById(id);

        res.status(200).json(post)

    }
    catch(error){
        res.staus(404).json({ message:error.message})
    }
}


export const commentPost = async(req,res) => {
    const {id} = req.params;
    const {value} = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost)
}