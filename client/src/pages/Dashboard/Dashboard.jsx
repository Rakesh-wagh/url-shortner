import { Box, Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  const server_url = import.meta.env.VITE_SERVER_URL;

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, px: 4, py: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" color="textPrimary">
            Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Overview of your shortened URLs and activity.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" color="textPrimary">
                  Total Links
                </Typography>
                <Typography variant="h4" color="primary" sx={{ my: 1 }}>
                  50
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" color="textPrimary" >
                  Clicks
                </Typography>
                <Typography variant="h4" color="success.main" sx={{ my: 1 }}>
                  254
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" color="textPrimary">
                  Active Links
                </Typography>
                <Typography variant="h4" color="warning.main" sx={{ my: 1 }}>
                  28
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Shortened Links Section */}
        <Paper sx={{ boxShadow: 6, mt: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", p: 2 }}>
            Recent Shortened Links
          </Typography>
          <Box sx={{ p: 2 }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Short URL</th>
                  <th scope="col">Original URL</th>
                  <th scope="col">Clicks</th>
                  <th scope="col">Created</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link
                      to={`${server_url}/urls/hSMFHe`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", textDecoration: "underline" }}
                    >
                      {server_url}/urls/hSMFHe
                    </Link>
                  </td>
                  <td>https://example.com/long-url</td>
                  <td>24</td>
                  <td>Jan 10, 2026</td>
                </tr>
                <tr>
                  <td>
                    <Link
                      to={`${server_url}/urls/gWcQYH`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", textDecoration: "underline" }}
                    >
                      {server_url}/urls/gWcQYH
                    </Link>
                  </td>
                  <td>https://anotherexample.com/page</td>
                  <td>94</td>
                  <td>Jan 12, 2026</td>
                </tr>
                <tr>
                  <td>
                    <Link
                      to={`${server_url}/urls/pqr456`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", textDecoration: "underline" }}
                    >
                      {server_url}/urls/pqr456
                    </Link>
                  </td>
                  <td>https://mysite.com/blog/article</td>
                  <td>51</td>
                  <td>Jan 14, 2026</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Paper>

        {/* Create New Link Section */}
        <Box sx={{ mt: 4 }}>
          <Card sx={{ boxShadow: 6, borderRadius: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Ready to shorten a new link?
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Generate branded short links and track performance instantly.
              </Typography>
              <Link to="/shorten-url">
                <Button variant="contained" color="primary" sx={{ px: 4, py: 1 }}>
                  Create New Link
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Dashboard;