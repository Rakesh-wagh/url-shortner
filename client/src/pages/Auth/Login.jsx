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

const LoginBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: "8px",
  boxShadow: theme.shadows[5],
  maxWidth: "400px",
  width: "100%",
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LoginBox>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin} autoComplete="off">
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
        <Box textAlign="center" marginTop={2}>
          <Typography variant="body2">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </LoginBox>
    </Box>
  );
};

export default Login;