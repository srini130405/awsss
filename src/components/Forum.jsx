import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      const response = await axios.post('http://localhost:5000/post', { message }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.status === 201) {
        setMessage('');
        fetchPosts();
      }
    } catch (error) {
      console.error('Error posting message', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Forum</h1>
      <form onSubmit={handlePostSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <textarea
            placeholder="Write something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
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
  );
};

const styles = {
    container: {
      width: '300px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputGroup: {
      marginBottom: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
    },
    button: {
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    message: {
      color: 'green',
      marginTop: '10px',
    },
    toggleButton: {
      marginTop: '10px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    postsContainer: {
      marginTop: '20px',
    },
    post: {
      backgroundColor: 'black',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      textAlign: 'left',
    },
  };

export default Forum;
