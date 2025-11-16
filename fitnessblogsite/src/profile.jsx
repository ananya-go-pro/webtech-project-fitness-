import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true
      });
      setProfile(res.data);
      setMessage("");
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response) {
        setMessage(`Failed to load profile: ${err.response.data?.message || err.response.statusText}`);
      } else {
        setMessage("Failed to load profile");
      }
    }
  };

  if (!profile) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Profile</h2>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile</h2>
      <h3>Username: {profile.username}</h3>
      
      <h3>My Posts ({profile.posts?.length || 0})</h3>
      {profile.posts && profile.posts.length > 0 ? (
        profile.posts.map((post, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <small>Likes: {post.likes || 0}</small>
          </div>
        ))
      ) : (
        <p>No posts yet</p>
      )}

      <h3>My Plans ({profile.plans?.length || 0})</h3>
      {profile.plans && profile.plans.length > 0 ? (
        profile.plans.map((plan, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{plan.title}</h4>
            <p><strong>Monday:</strong> {plan.monday || "Rest"}</p>
            <p><strong>Tuesday:</strong> {plan.tuesday || "Rest"}</p>
            <p><strong>Wednesday:</strong> {plan.wednesday || "Rest"}</p>
            <p><strong>Thursday:</strong> {plan.thursday || "Rest"}</p>
            <p><strong>Friday:</strong> {plan.friday || "Rest"}</p>
            <p><strong>Saturday:</strong> {plan.saturday || "Rest"}</p>
            <p><strong>Sunday:</strong> {plan.sunday || "Rest"}</p>
          </div>
        ))
      ) : (
        <p>No plans yet</p>
      )}
    </div>
  );
}

export default Profile;

