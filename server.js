// server.js
const express = require("express");
const session = require("express-session");
const loginRouter = require("./login");
const signupRouter = require("./signup");
const blogpost = require("./blogpost");
const addpost = require("./addpost");
const addplan = require("./addplan");
const showplan = require("./showplan");
const profile = require("./profile");
const calories = require("./calories");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Configure CORS to allow credentials (cookies/sessions)
app.use(cors({
  origin: "http://localhost:5173", // Vite default port, adjust if different
  credentials: true
}));

// Middleware to parse JSON requests
app.use(express.json());

app.use(session({
  secret: "notasecret", 
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: false,
    secure: false, // set to true if using HTTPS
    sameSite: 'lax' // helps with CORS and cookies
  }
}));

// Use your route modules
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/blogpost", blogpost);
app.use("/addpost", addpost);
app.use("/showplan", showplan);
app.use("/addplan", addplan);
app.use("/profile", profile);
app.use("/calories", calories);

// Optional root route
app.get("/", (req, res) => {
  res.send("it is running aaaaaaaaa");
});

app.get('/login', (req, res) => {
  res.redirect(301, '/blogpost');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});