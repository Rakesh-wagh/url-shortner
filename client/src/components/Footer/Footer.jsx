import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Footer = () => (
  <Paper sx={{ mt: "auto", py: 2, backgroundColor: "background.paper", boxShadow: 1 }}>
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  </Paper>
);

export default Footer;