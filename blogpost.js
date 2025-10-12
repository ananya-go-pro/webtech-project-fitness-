const express= require("express")
const { run } = require("./database.js")

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("hmmmm")
    const db = await run();
    const posts = db.collection("posts");

    const post=await posts.find({}, { projection: { _id: 0 } }).toArray()

    res.json(post);

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router