import React, { useState } from "react";

import UploadBox from "./UploadBox";

const UploadPage = () => {
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Upload to server
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          style={inputItemStyle}
          type="email"
          value={email}
          onChange={handleChange}
          placeholder={"Email"}
        />
        <UploadBox setFiles={setFiles} />
        <div>{files.map((f) => f.path)}</div>
        <input type="submit" value="Submit" style={inputItemStyle} />
      </form>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
};

const formStyle = {
  margin: "2rem 1rem",
  width: "clamp(5rem, 30rem, 50rem)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const inputItemStyle = {
  marginTop: "1rem",
  height: "2rem",
  fontSize: "1rem",
};

export default UploadPage;
