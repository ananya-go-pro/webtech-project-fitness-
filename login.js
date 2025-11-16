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
      res.json({ success: true, message: "okay", username:user.username });
    } else {
      res.status(401).json({ message: "no" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to check if user is logged in
router.get("/current", async (req, res) => {
  try {
    if (req.session && req.session.username) {
      res.json({ loggedIn: true, username: req.session.username });
    } else {
      res.json({ loggedIn: false });
    }
  } catch (err) {
    console.error("Error checking login status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint to logout
router.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router