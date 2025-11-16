const express = require("express");
const { run } = require("./database.js");

const router = express.Router();

function getFormattedDate() {
  const date = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const getSuffix = (n) => {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${month} ${day}${getSuffix(day)} ${year}`;
}

router.post("/", async (req, res) => {
  try {
    if (!req.session || !req.session.username) {
      return res.status(401).json({ message: "You must be logged in to add a plan" });
    }

    const { cal } = req.body;
    const username = req.session.username;

    const db = await run();
    const calories = db.collection("calories");

    const date = getFormattedDate();

    const result = await calories.insertOne({ username, cal, date });

    const calorie = await calories.findOne(
      { _id: result.insertedId },
      { projection: { _id: 0 } }
    );

    res.json({ calorie });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;