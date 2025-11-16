import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./signup";
import Login from "./login";
import Blog from "./blogs";

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
      // Even if there's an error, clear the local state
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
        <button onClick={handleLogout}>Logout</button>
      )}
      <Routes>
        <Route path="/signup" element={<Signup onSignupSuccess={checkLoginStatus} />} />
        <Route path="/login" element={<Login onLoginSuccess={checkLoginStatus} />} />
        <Route path="/blogpost" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;