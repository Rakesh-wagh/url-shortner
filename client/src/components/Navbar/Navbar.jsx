import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Link as MUILink } from "@mui/material";
import API from "../../api/api";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/urls/me")
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          // If the error response status is 401, redirect to the login page
          if (error.response && error.response.status === 401) {
            // Clear the token from localStorage and navigate to login
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            console.error("Error in getting user data:", error);
          }
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px" }}>
        {/* Left Section - Brand and Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MUILink component={Link} to="/" sx={{ textDecoration: "none", color: "primary.main" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              URL Shortener
            </Typography>
          </MUILink>

          {username && (
            <Box sx={{ display: "flex", marginLeft: 4 }}>
              <MUILink component={Link} to="/shorten-url" sx={{ textDecoration: "none", color: "text.primary", marginRight: 2 }}>
                <Button sx={{ color: "text.primary" }}>Shorten URL</Button>
              </MUILink>
              <MUILink component={Link} to="/urls" sx={{ textDecoration: "none", color: "text.primary" }}>
                <Button sx={{ color: "text.primary" }}>My URLs</Button>
              </MUILink>
            </Box>
          )}
        </Box>

        {/* Right Section - Username and Logout */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {username && (
            <>
              <Typography variant="body2" sx={{ marginRight: 3, color: "text.primary", fontWeight: "bold" }}>
                {username}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ paddingX: 3 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;