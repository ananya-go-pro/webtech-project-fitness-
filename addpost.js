const express= require("express")
const { run } = require("./database.js")

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.session || !req.session.username) {
      return res.status(401).json({ message: "You must be logged in to add a post" });
    }
    const { title, body } = req.body;
    const username = req.session.username;
    console.log("hmmmm")
    const db = await run();
    const posts = db.collection("posts");

    const result = await posts.insertOne({ username, title, body });
    const post = await posts.findOne({ _id: result.insertedId },{ projection: { _id: 0 } });
    res.json({ post });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router