import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const Shorten = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post(`/urls/shorten`, {
        original_url: e.target.longUrl.value,
        custom_code: e.target.customCode.value || undefined,
      });
      if (response.status === 200) {
        navigate("/urls");
      }
    } catch (err) {
      alert("Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Create a Short Link
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Enter your long URL"
                id="longUrl"
                name="longUrl"
                placeholder="https://example.com/my-long-url"
                required
                variant="outlined"
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Custom short code (optional)"
                id="customCode"
                name="customCode"
                placeholder="e.g. my-custom-link"
                variant="outlined"
              />
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                Leave blank to auto-generate a code.
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ padding: "12px", marginTop: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Get your Short Link"}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Shorten;