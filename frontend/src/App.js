import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Alert } from "@mui/material";

import { useNavigate } from "react-router-dom";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:10000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("authToken", data.token); //store token in local storage
      navigate("/products"); //navigate to products page after logging in
    } else if (response.status === 401) {
      setError("Invalid username or password.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert variant="error" severity="info">
          Invalid username or password.
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default App;
