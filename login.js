const express= require("express")
const { run } = require("./database.js")

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    console.log("hmmmm")
    const db = await run();
    const users = db.collection("users");

    const user = await users.findOne({ username, password });

    if (user) {
      req.session.username = user.username;
      res.json({ message: "okay", username:user.username });
    } else {
      res.status(401).json({ message: "no" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router