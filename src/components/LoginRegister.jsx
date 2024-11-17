import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        setMessage("User registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage("Error registering user. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (response.status === 200) {
        setMessage("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      setMessage("Error logging in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  const styles = {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "32px 24px",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
      color: "white",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxSizing: "border-box",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(10px)",
      textAlign: "center",
    },
    heading: {
      fontSize: "1.5rem",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      textAlign: "left",
    },
    label: {
      color: "#dcdcdc",
      fontWeight: "600",
      fontSize: "12px",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "inherit",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#40c9ff",
    },
    button: {
      alignSelf: "center",
      fontFamily: "inherit",
      color: "#fff",
      background: "linear-gradient(90deg, #e81cff, #40c9ff)",
      border: "none",
      padding: "12px 16px",
      fontSize: "inherit",
      cursor: "pointer",
      borderRadius: "8px",
      width: "100%",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      background: "linear-gradient(90deg, #40c9ff, #e81cff)",
    },
    message: {
      color: "lightgreen",
      marginTop: "10px",
    },
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        {isRegistering ? "Registration Form" : "Login Form"}
      </h1>
      <form
        onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}
        style={styles.form}
      >
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="Enter your username"
            style={styles.input}
          />
        </div>
        {isRegistering && (
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>
        )}
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          disabled={loading}
          onMouseOver={(e) =>
            (e.target.style.background = styles.buttonHover.background)
          }
          onMouseOut={(e) =>
            (e.target.style.background = styles.button.background)
          }
        >
          {loading
            ? isRegistering
              ? "Registering..."
              : "Logging in..."
            : isRegistering
            ? "Register"
            : "Login"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        style={styles.button}
        onMouseOver={(e) =>
          (e.target.style.background = styles.buttonHover.background)
        }
        onMouseOut={(e) =>
          (e.target.style.background = styles.button.background)
        }
      >
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};
export default LoginRegister;