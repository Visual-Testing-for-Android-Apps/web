import React from "react";
import "./footer.css";
import PrivacyPolicyPage from "../mainPage/PrivacyPolicyPage";

const Footer = () => {
  return (
    <footer>
      <span>Contact us</span>
      <a href="/privacypolicypage" style={{ color: "#fff" }}>
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
