import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer bg-light text-center py-3 mt-auto border-top">
    <div className="container">
      <span className="text-muted">
        &copy; {new Date().getFullYear()} All rights reserved.
      </span>
    </div>
  </footer>
);

export default Footer;
