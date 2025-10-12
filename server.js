// server.js
const express = require("express");
const session = require("express-session");
const loginRouter = require("./login");
const signupRouter = require("./signup");
const blogpost = require("./blogpost");
const addpost = require("./addpost");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());


// Middleware to parse JSON requests
app.use(express.json());

app.use(session({
  secret: "notasecret", 
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: false,secure: false } // set to true if using HTTPS
}));

// Use your route modules
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/blogpost", blogpost);
app.use("/addpost", addpost);

// Optional root route
app.get("/", (req, res) => {
  res.send("it is running aaaaaaaaa");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});