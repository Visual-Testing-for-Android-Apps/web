
import React, { useState, useRef, useEffect} from "react";
import { useLocation } from "react-router";
import "./batch-job.css";

const BatchSubmitPage = () => {
  const { email } = useLocation().state ?? {};

  return (
    <div className="section_container">
      <h1 style={{ textAlign: "center" }}>Batch Job Submitted Successfully!</h1>
      <p style={{ textAlign: "center", fontSize: 18 }}>Your results will be sent to following email address:</p>
      <p style={{ textAlign: "center", fontSize: 18}}>{email}</p>
    </div>
  );
};

export default BatchSubmitPage;
