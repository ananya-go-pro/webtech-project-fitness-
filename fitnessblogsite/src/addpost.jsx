import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const submitPost = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim() || !body.trim()) {
      setMessage("Title and body are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/addpost", {
        title,
        body,
      }, {
        withCredentials: true
      });

      setMessage("Post added successfully!");
      setTimeout(() => {
        navigate("/blogpost");
      }, 1000);
    } catch (err) {
      console.error("Error adding post:", err);
      if (err.response) {
        setMessage(err.response.data?.message || "Failed to add post");
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create Blog Post</h2>
      <form onSubmit={submitPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px" }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%", padding: "8px", minHeight: "100px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", marginBottom: "10px" }}>
          Submit Post
        </button>
        <button 
          type="button" 
          onClick={() => navigate("/blogpost")}
          style={{ padding: "8px 16px", marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
      {message && <p style={{ marginTop: 10, color: message.includes("error") || message.includes("Failed") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}

export default AddPost;

