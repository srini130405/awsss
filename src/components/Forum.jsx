import React, { useState, useEffect } from "react";
import axios from "axios";
const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:6000/posts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      const response = await axios.post(
        "http://localhost:6000/post",
        { message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 201) {
        setMessage("");
        fetchPosts();
      }
    } catch (error) {
      console.error("Error posting message", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #121212, #1d1d42)",
      overflow: "hidden",
    },
    container: {
      width: "800px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "30px 24px",
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      color: "white",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxSizing: "border-box",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(10px)",
      maxHeight: "90vh", // Ensures some margin above and below
      overflowY: "auto",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "15px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "12px",
      borderRadius: "8px",
      color: "#fff",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      resize: "none",
      height: "80px",
      fontSize: "14px",
    },
    button: {
      alignSelf: "center",
      fontFamily: "inherit",
      color: "#fff",
      background: "linear-gradient(90deg, #e81cff, #40c9ff)",
      border: "none",
      padding: "12px 20px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "8px",
      width: "50%",
      transition: "all 0.3s ease",
    },
    postsContainer: {
      marginTop: "15px",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    post: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "15px",
      borderRadius: "8px",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      fontSize: "14px",
    },
  };
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Forum</h1>
        <form onSubmit={handlePostSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <textarea
              placeholder="Write something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #40c9ff, #e81cff)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #e81cff, #40c9ff)")
            }
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
        <div style={styles.postsContainer}>
          {posts.map((post, index) => (
            <div key={post.id || index} style={styles.post}>
              <p>
                <strong>{post.username}</strong>: {post.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Forum;