const express= require("express")
const { run } = require("./database.js")

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.session || !req.session.username) {
      return res.status(401).json({ message: "You must be logged in to add a plan" });
    }
    const { title, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
    const username = req.session.username;
    console.log("hmmmm")
    const db = await run();
    const plans = db.collection("plans");

    const result = await plans.insertOne({ username, title, monday, tuesday, wednesday, thursday, friday, saturday, sunday });
    const plan = await plans.findOne({ _id: result.insertedId },{ projection: { _id: 0 } });
    res.json({ plan });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router