import React, { useState, useEffect } from "react";
import axios from "axios";

function Calories() {
  const [cal, setCal] = useState("");
  const [message, setMessage] = useState("");
  const [calories, setCalories] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchCalories();
  }, []);

  const fetchCalories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/calories", {
        withCredentials: true
      });
      if (res.data && res.data.calories) {
        setCalories(res.data.calories);
        setMessage("");
      } else {
        setMessage("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching calories:", err);
      if (err.response) {
        setMessage(`Failed to load calories: ${err.response.data?.message || err.response.statusText}`);
      } else {
        setMessage("Failed to load calories");
      }
    }
  };

  const submitCalories = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!cal.trim() || isNaN(cal)) {
      setMessage("Please enter a valid number");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/calories", {
        cal: parseInt(cal),
      }, {
        withCredentials: true
      });

      setMessage(`Calories added successfully for ${res.data.calorie?.date || "today"}!`);
      setCal("");
      fetchCalories(); // Refresh the list
    } catch (err) {
      console.error("Error adding calories:", err);
      if (err.response) {
        setMessage(err.response.data?.message || "Failed to add calories");
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Calories</h2>
      <form onSubmit={submitCalories}>
        <input
          type="number"
          placeholder="Calories consumed"
          value={cal}
          onChange={(e) => setCal(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%", maxWidth: "500px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", marginBottom: "10px" }}>
          Submit Calories
        </button>
      </form>
      {message && <p style={{ marginTop: 10, color: message.includes("error") || message.includes("Failed") ? "red" : "green" }}>{message}</p>}

      <h2>My Calories</h2>
      {calories.length === 0 ? (
        <p>No calories logged yet</p>
      ) : (
        calories.map((entry, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Calories:</strong> {entry.cal}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Calories;

