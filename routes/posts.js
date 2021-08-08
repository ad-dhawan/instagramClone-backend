const router = require('express').Router();
const Post = require("../models/Post");
const User = require('../models/User');

//Create A Post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json({status: 200, message: "Posted"})
    } catch (err) {
        console.log(err)
        res.status(500).json({status: 500, message: "Internal Server Error"})
    }
});

//Delete a Post
router.delete('/delete/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json({status: 200, message: "Post Deleted"})
        } else {
            res.status(403).json({status: 403, message: "Can't delete other user's post"})
        }
    } catch(err){
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
});

//Like/Dislike a Post
router.put('/like/:id', async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id});
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: {likes: req.body.userId}});
            res.status(200).json({status: 200, message: "Post Likes"})
        } else {
            await post.updateOne({ $pull: {likes: req.body.userId}});
            res.status(200).json({status: 200, message: "Post Disliked"});
        }
    } catch (err){
        console.log(err);
        res.status(500).json({status: 500, message: "Internal Server Error"})
    }
});

//Get all Posts
router.get("/allPosts", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;