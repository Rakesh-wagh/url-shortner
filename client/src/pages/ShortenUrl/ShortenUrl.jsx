import React, { useState } from "react";
import QRCodeSection from "./QRCodeSection";
import Shorten from "./Shorten";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Box, Button, Tabs, Tab, Typography } from "@mui/material";

const ShortenUrl = () => {
  const [activeTab, setActiveTab] = useState("short");

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 5 }}>
        {/* Tab Navigation */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          sx={{ marginBottom: 4 }}
        >
          <Tab label="Short Link" value="short" />
          <Tab label="QR Code" value="qr" />
        </Tabs>

        {/* Active Tab Content */}
        <Box sx={{ padding: 3 }}>
          {activeTab === "qr" ? <QRCodeSection /> : <Shorten />}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ShortenUrl;