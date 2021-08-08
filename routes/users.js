const router = require("express").Router();
const User = require("../models/User");

//Search a User
router.post("/search", async (req, res) => {
    try {
      const user = await User.findOne({username: req.body.username});
      if(!user){
          res.status(404).json({status: 404, message: "User not found"})
      }
      res.status(200).json({status: 200, message: "User found", id: user._id, username: user.username, email: user.email});
    } catch (err) {
      res.status(500).json({status: 500, message: "Internal Server Error"});
    }
  });

//Follow a User
router.put("/follow/:username", async (req,res) => {
    if(req.body.username !== req.params.username) {
        try{
            const user = await User.findOne({username: req.params.username});
            const currentUser = await User.findOne({username: req.body.username});
            if(!user.followers.includes(req.body.username)){
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json({status: 200, message: `${req.body.username} followed ${req.params.username}`})
            } else {
                res.status(403).json({status: 403, message: `${req.body.username} already follows ${req.params.username}`})
            }
        } catch(err) {
            res.status(500).json({status: 500, message: "Internal Server Error"});
        }
    } else {
        res.status(402).json({status: 402, message: "Can not follow yourself"})
    }
})

//Unfollow a User
router.put("/unfollow/:username", async (req,res) => {
    if(req.body.username !== req.params.username) {
        try{
            const user = await User.findOne({username: req.params.username});
            const currentUser = await User.findOne({username: req.body.username});
            if(!user.followers.includes(req.body.username)){
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json({status: 200, message: `${req.body.username} unfollowed ${req.params.username}`})
            } else {
                res.status(403).json({status: 403, message: `${req.body.username} doesn't follow ${req.params.username}`})
            }
        } catch(err) {
            res.status(500).json({status: 500, message: "Internal Server Error"});
        }
    } else {
        res.status(402).json({status: 402, message: "Can not unfollow yourself"})
    }
})

module.exports = router;