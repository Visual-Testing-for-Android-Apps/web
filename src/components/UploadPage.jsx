import React, { useEffect, useRef, useState } from  "react";

import Repository from '../data/Repository';
import UploadBox from './UploadBox';

const UploadPage = () => {
    const [email, setEmail] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [files, setFiles] = useState([]);

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    useEffect(() => {
        console.log(files);
    }, [files])

    const handleSubmit = (event) => {
        event.preventDefault();
        new Repository().sumbitForAnalysis(files)
        .then(res => res.json()).then(data => {
            setDisplayText(`Server returned: ${JSON.stringify(data)}`);
        });
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input style={textInputStyle} type="email" value={email} onChange={handleChange} placeholder={"Email"} />
                <UploadBox setFiles={setFiles} />
                <div>{files.map(f => f.path)}</div>
                <input type="submit" value="Submit" style={{...itemStyle, ...textInputStyle}} />
            </form>
            <h1>{displayText}</h1>
        </div>
    )
}

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
}

const formStyle = {
    margin: "2rem 1rem",
    width: "clamp(5rem, 30rem, 50rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}

const itemStyle = {
    marginTop: "1rem"
}

const textInputStyle = {
    height: "32px",
    fontSize: "16px"
}

export default UploadPage;
