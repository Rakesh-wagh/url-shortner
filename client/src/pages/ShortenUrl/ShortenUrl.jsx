import React, { useState } from "react";
import QRCodeSection from "./QRCodeSection";
import Shorten from "./Shorten";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const ShortenUrl = () => {
  const [activeTab, setActiveTab] = useState("short");

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="d-flex mb-4">
          <button
            className={`btn me-2 ${activeTab === "short" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("short")}
          >
            Short Link
          </button>
          <button
            className={`btn ${activeTab === "qr" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("qr")}
          >
            QR Code
          </button>
        </div>

        {activeTab === "qr" ? <QRCodeSection /> : <Shorten />}
      </div>
      <Footer />
    </>
  );
};

export default ShortenUrl;
