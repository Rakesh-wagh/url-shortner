import React, { useState } from "react";
import API from "../../api/api";
import { Box, Button, TextField, Typography, CircularProgress, Alert, Grid } from "@mui/material";

const QRCodeSection = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQrImage(null);
    try {
      const response = await API.post(
        "/urls/qr/",
        { original_url: qrUrl },
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(response.data);
      setQrImage(url);
    } catch (err) {
      setError("Failed to create QR Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} md={6}>
        <Box>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Create a QR Code
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* URL Input */}
            <TextField
              fullWidth
              label="Enter your QR Code destination"
              id="qrUrl"
              placeholder="https://example.com/my-long-url"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              required
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ padding: "8px", marginBottom: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  Get your QR Code for free <span>&rarr;</span>
                </>
              )}
            </Button>
          </form>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {/* QR Code Image */}
          {qrImage && (
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <img src={qrImage} alt="QR Code" style={{ maxWidth: "100%", height: "auto" }} />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default QRCodeSection;