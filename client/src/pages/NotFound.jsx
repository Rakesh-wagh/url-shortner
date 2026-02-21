import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ my: 2 }}>
        The page you're looking for doesn't exist.
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary">
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;