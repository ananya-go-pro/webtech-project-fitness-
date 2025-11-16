import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  // Configure axios to send credentials (cookies) for session
  axios.defaults.withCredentials = true;

  // Fetch posts on load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/blogpost", {
        withCredentials: true
      });
      if (res.data && res.data.posts) {
        setPosts(res.data.posts);
        setMessage(""); // Clear any previous error messages
      } else {
        setMessage("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      if (err.response) {
        setMessage(`Failed to load posts: ${err.response.data?.message || err.response.statusText}`);
      } else if (err.request) {
        setMessage("No response from server. Is the server running?");
      } else {
        setMessage("Failed to load posts");
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.put(`http://localhost:3000/blogpost/like/${postId}`, {}, {
        withCredentials: true
      });

      if (res.data.success) {
        // Update the post's likes count and isLiked status
        setPosts(posts.map(post => 
          post._id === postId 
            ? { ...post, likes: res.data.likes, isLiked: res.data.isLiked }
            : post
        ));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      if (err.response) {
        setMessage(err.response.data?.message || "Failed to toggle like");
      } else {
        setMessage("Failed to toggle like");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/addpost">
          <button style={{ padding: "8px 16px" }}>Add Post</button>
        </Link>
      </div>
      {message && <p style={{ marginTop: 10, color: message.includes("error") || message.includes("Failed") || message.includes("Invalid") ? "red" : "green" }}>{message}</p>}

      <h2>Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post, index) => (
          <div
            key={post._id || index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
              <small>
                By <strong>{post.username}</strong> | Likes: {post.likes || 0}
              </small>
              <button 
                onClick={() => handleLike(post._id)}
                style={{ 
                  padding: "5px 10px", 
                  backgroundColor: post.isLiked ? "#f44336" : "#4CAF50", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                {post.isLiked ? "Unlike" : "Like"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Blog;