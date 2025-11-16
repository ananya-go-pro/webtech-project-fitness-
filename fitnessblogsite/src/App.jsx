import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./signup";
import Login from "./login";
import Blog from "./blogs";
import Plans from "./plans";
import Profile from "./profile";
import Calories from "./calories";
import AddPost from "./addpost";
import AddPlan from "./addplan";

// Configure axios to send credentials
axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get("http://localhost:3000/login/current");
      if (res.data.loggedIn) {
        setIsLoggedIn(true);
        setUsername(res.data.username);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/login/logout", {}, {
        withCredentials: true
      });
      setIsLoggedIn(false);
      setUsername("");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Welcome!</h1>
      {!isLoggedIn ? (
        <>
          <Link to="/signup"><button>Signup</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <Link to="/blogpost"><button style={{ margin: "0 5px" }}>Posts</button></Link>
            <Link to="/plans"><button style={{ margin: "0 5px" }}>Plans</button></Link>
            <Link to="/profile"><button style={{ margin: "0 5px" }}>Profile</button></Link>
            <Link to="/calories"><button style={{ margin: "0 5px" }}>Calories</button></Link>
            <button onClick={handleLogout} style={{ margin: "0 5px" }}>Logout</button>
          </div>
        </>
      )}
      <Routes>
        <Route path="/signup" element={<Signup onSignupSuccess={checkLoginStatus} />} />
        <Route path="/login" element={<Login onLoginSuccess={checkLoginStatus} />} />
        <Route path="/blogpost" element={<Blog />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/addplan" element={<AddPlan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calories" element={<Calories />} />
      </Routes>
    </div>
  );
}

export default App;