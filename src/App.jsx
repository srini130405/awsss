import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import HomePage from './HomePage';
import ResourceReqPage from './ResourceReqPage';
import TestPage from './TestPage';
// Components for registration, login, and forum
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} /> {/* Add this route */}
        <Route path="/forum" element={<Forum />} />
        <Route path="/challenges" element={<HomePage />} />
        <Route path="/resource/:taskId" element={<ResourceReqPage />} />
        <Route path="/test/:taskId" element={<TestPage />} />
      </Routes>
    </Router>
  );
};

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate hook instead of history

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/register', { username, email, password });
      if (response.status === 201) {
        setMessage('User registered successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage('Error registering user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.status === 200) {
        setMessage('Login successful!');
        localStorage.setItem('token', response.data.token); // Save the token
        navigate('/home'); // Redirect to the new home page
      }
    } catch (error) {
      setMessage('Error logging in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>{isRegistering ? 'Registration Form' : 'Login Form'}</h1>
      {isRegistering ? (
        <form onSubmit={handleRegisterSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {message && <p style={styles.message}>{message}</p>}

      <button onClick={() => setIsRegistering(!isRegistering)} style={styles.toggleButton}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};




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
        fetchPosts(); // Refresh posts after posting
      }
    } catch (error) {
      console.error('Error posting message', error);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Forum</h1>
      <form onSubmit={handlePostSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <textarea placeholder="Write something..." value={message} onChange={(e) => setMessage(e.target.value)} style={styles.input} />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div style={styles.postsContainer}>
        {posts.map((post, index) => (
          <div key={post.id || index} style={styles.post}>
            <p><strong>{post.username}</strong>: {post.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Select a Task</h1>
      <Link to="/forum">
        <button style={styles.button}>Forum</button>
      </Link>
      <Link to="/challenges">
        <button style={styles.button}>Challenges</button>
      </Link>
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
    backgroundColor: '#f1f1f1',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    textAlign: 'left',
  },
};

export default App;
