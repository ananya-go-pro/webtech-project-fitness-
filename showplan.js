const express= require("express")
const { run } = require("./database.js")

const router = express.Router();

// GET route to fetch all posts
router.get("/", async (req, res) => {
  try {
    const db = await run();
    const plans = db.collection("plans");
    const currentUsername = req.session?.username || null;

    const plan = await plans.find({username:currentUsername}).toArray()
    
    res.json({ plans: plan });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router