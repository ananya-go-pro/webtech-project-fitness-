import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:3000/showplan", {
        withCredentials: true
      });
      if (res.data && res.data.plans) {
        setPlans(res.data.plans);
        setMessage("");
      } else {
        setMessage("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching plans:", err);
      if (err.response) {
        setMessage(`Failed to load plans: ${err.response.data?.message || err.response.statusText}`);
      } else {
        setMessage("Failed to load plans");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/addplan">
          <button style={{ padding: "8px 16px" }}>Add Plan</button>
        </Link>
      </div>
      {message && <p style={{ marginTop: 10, color: message.includes("error") || message.includes("Failed") ? "red" : "green" }}>{message}</p>}

      <h2>My Plans</h2>
      {plans.length === 0 ? (
        <p>No plans yet</p>
      ) : (
        plans.map((plan, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{plan.title}</h3>
            <p><strong>Monday:</strong> {plan.monday || "Rest"}</p>
            <p><strong>Tuesday:</strong> {plan.tuesday || "Rest"}</p>
            <p><strong>Wednesday:</strong> {plan.wednesday || "Rest"}</p>
            <p><strong>Thursday:</strong> {plan.thursday || "Rest"}</p>
            <p><strong>Friday:</strong> {plan.friday || "Rest"}</p>
            <p><strong>Saturday:</strong> {plan.saturday || "Rest"}</p>
            <p><strong>Sunday:</strong> {plan.sunday || "Rest"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Plans;

