import { useEffect, useState } from "react";
import API from "../../api/api";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Alert } from "@mui/material";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const server_url = import.meta.env.VITE_SERVER_URL;

  const fetchUrls = async () => {
    try {
      const response = await API.get("/urls");
      setUrls(response.data);
    } catch (err) {
      setError("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/urls/${id}`);
      setUrls(urls.filter((url) => url.short_code !== id));
    } catch (err) {
      alert("Failed to delete URL");
    }
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}><CircularProgress /></Box>;
  if (error)
    return (
      <Box sx={{ marginTop: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <>
      <Navbar />
      <Box sx={{px: 2, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Your Shortened URLs
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="shortened URLs table">
            <TableHead>
              <TableRow>
                <TableCell>Shorten Url</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No URLs found.
                  </TableCell>
                </TableRow>
              ) : (
                urls.map((url) => (
                  <TableRow key={url.id}>
                    <TableCell>
                      <a
                        href={`${server_url}/urls/${url.short_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#1976d2", // MUI primary color
                          textDecoration: "underline",
                        }}
                      >
                        {`${server_url}/urls/${url.short_code}`}
                      </a>
                    </TableCell>
                    <TableCell>{url.clicks}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(url.short_code)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </>
  );
};

export default UrlList;