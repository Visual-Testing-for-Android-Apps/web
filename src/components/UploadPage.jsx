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
        <>
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input style={textInputStyle} type="email" value={email} onChange={handleChange} placeholder={"Email"} />
                <UploadBox setFiles={setFiles} />
                <div>{files.map(f => f.path)}</div>
                <input className="g-recaptcha" data-sitekey="6LeIkakaAAAAAN7IyMjgyCZphTmLkgQuPC0uEh5K" data-callback="handleCaptcha" type="submit" value="Submit" style={{ ...itemStyle, ...textInputStyle }} />
            </form>
        </div>
        <h1>{displayText}</h1>
        </>
    )
}

// Added global function to fetch CAPTCHA response data (DOES NOT WORK LOCALHOST DUE TO CORS. UNTESTED FOR HEROKU)
// Ideal scenario is that it will produce in console all the CAPTCHA data, untested because of CORS
function handleCaptcha(event) {
    fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            secret: '6LeIkakaAAAAAEVtMRSeU2Zhoba4x5P2E_bPvg8r',
            response: event
        }
        )
    // Might need to edit this to get the correct log in console
    }).then(response => response.json()).then(data => console.log(data));
}
window.handleCaptcha = handleCaptcha

const containerStyle = {
    display: "flex",
    justifyContent: "center"
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
