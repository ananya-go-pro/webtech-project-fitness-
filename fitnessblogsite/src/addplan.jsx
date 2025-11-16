import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPlan() {
  const [title, setTitle] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const submitPlan = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Title is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/addplan", {
        title,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      }, {
        withCredentials: true
      });

      setMessage("Plan added successfully!");
      setTimeout(() => {
        navigate("/plans");
      }, 1000);
    } catch (err) {
      console.error("Error adding plan:", err);
      if (err.response) {
        setMessage(err.response.data?.message || "Failed to add plan");
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create Workout Plan</h2>
      <form onSubmit={submitPlan}>
        <input
          type="text"
          placeholder="Plan Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Monday"
          value={monday}
          onChange={(e) => setMonday(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Tuesday"
          value={tuesday}
          onChange={(e) => setTuesday(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Wednesday"
          value={wednesday}
          onChange={(e) => setWednesday(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Thursday"
          value={thursday}
          onChange={(e) => setThursday(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Friday"
          value={friday}
          onChange={(e) => setFriday(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Saturday"
          value={saturday}
          onChange={(e) => setSaturday(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Sunday"
          value={sunday}
          onChange={(e) => setSunday(e.target.value)}
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", marginBottom: "10px" }}>
          Submit Plan
        </button>
        <button 
          type="button" 
          onClick={() => navigate("/plans")}
          style={{ padding: "8px 16px", marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
      {message && <p style={{ marginTop: 10, color: message.includes("error") || message.includes("Failed") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}

export default AddPlan;

