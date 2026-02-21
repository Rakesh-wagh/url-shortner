import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";

// Create a styled component for the gradient background
const GradientBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #6a0dad, #9b4dca)", // Purple gradient
  padding: theme.spacing(4),
}));

const RegisterBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: "8px",
  boxShadow: theme.shadows[5],
  maxWidth: "400px",
  width: "100%",
}));

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        setSuccess("Registration successful! You can now log in.");
        navigate("/login");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <RegisterBox>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister} autoComplete="off">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            autoFocus
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" align="center" variant="body2" marginTop={2}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" align="center" variant="body2" marginTop={2}>
              {success}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </form>
        <Box textAlign="center" marginTop={2}>
          <Typography variant="body2">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </RegisterBox>
    </Box>
  );
};

export default Register;