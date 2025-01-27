import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo2.jpg"; 
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      
      const { token } = response.data; 
      localStorage.setItem("token", token); // Store the token in local storage

      alert(response.data.message);
     
      navigate("/#header"); // Redirect to /#header after successful login
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message); 
      } else {
        alert("An error occurred during login. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/"); // Redirect to the home page
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.imageContainer}>
          <img src={logo} alt="Logo" style={styles.image} />
        </div>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Login</button>
            <p style={styles.register}>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
          <button onClick={handleLogout} style={styles.button}>Logout</button> {/* Logout button */}
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  loginBox: {
    display: "flex",
    width: "60%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "80%",
    maxHeight: "80%",
    objectFit: "contain",
  },
  formContainer: {
    flex: 1,
    padding: "40px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "3rem",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "2rem",
  },
  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1.75rem",
  },
  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "2rem",
  },
  register: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "1.75rem",
  },
};

export default Login;
