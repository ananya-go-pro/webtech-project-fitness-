import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Signup from "./signup"; // your Signup component
import Login from "./login";   // your Login component

function App() {
  const [activeForm, setActiveForm] = useState(null); // "signup" or "login"

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Welcome!</h1>
      <button onClick={() => setActiveForm("signup")}>Signup</button>
      <button onClick={() => setActiveForm("login")}>Login</button>

      <div style={{ marginTop: 20 }}>
        {activeForm === "signup" && <Signup />}
        {activeForm === "login" && <Login />}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);