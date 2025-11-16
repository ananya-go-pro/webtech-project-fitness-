const express= require("express")
const { run } = require("./database.js")
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET route to fetch all posts
router.get("/", async (req, res) => {
  try {
    const db = await run();
    const posts = db.collection("posts");
    const currentUsername = req.session?.username || null;

    const post = await posts.find({}).toArray()
    
    // Convert _id to string for frontend and add isLiked status
    const postsWithStringId = post.map(p => {
      const likedBy = p.likedBy || [];
      return {
        ...p,
        _id: p._id.toString(),
        likedBy: likedBy,
        isLiked: currentUsername ? likedBy.includes(currentUsername) : false
      };
    });

    res.json({ posts: postsWithStringId });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT route to toggle like/unlike a post
router.put("/like/:id", async (req, res) => {
  try {
    if (!req.session || !req.session.username) {
      return res.status(401).json({ message: "You must be logged in to like posts" });
    }

    const db = await run();
    const posts = db.collection("posts");
    
    const postId = req.params.id;
    const username = req.session.username;
    
    // Find the post first
    const post = await posts.findOne({ _id: new ObjectId(postId) });
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Initialize likedBy array if it doesn't exist
    const likedBy = post.likedBy || [];
    const isLiked = likedBy.includes(username);

    let result;
    if (isLiked) {
      // Unlike: remove username from likedBy and decrement likes
      result = await posts.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { 
          $pull: { likedBy: username },
          $inc: { likes: -1 }
        },
        { returnDocument: 'after' }
      );
    } else {
      // Like: add username to likedBy and increment likes
      result = await posts.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { 
          $addToSet: { likedBy: username },
          $inc: { likes: 1 }
        },
        { returnDocument: 'after' }
      );
    }

    res.json({ 
      success: true, 
      likes: result.likes,
      isLiked: !isLiked, // Return the new state
      message: isLiked ? "Post unliked" : "Post liked successfully" 
    });

  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router