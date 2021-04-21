import React, { useEffect } from "react";
import './service.css';

const Service = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = onSubmit.toString()
        document.body.appendChild(script)
    })

    function onSubmit(token) {
        console.log(token)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Would somehow need to get the secret key here. 
            // Using process.env did not work as it wouldn't even send the fetch request
            // Don't think we're meant to use them anyway for secret keys
            // from react docs -> WARNING: Do not store any secrets (such as private API keys) in your React app!
            // Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.
            body: JSON.stringify({ secret: "SECRET KEY", response: token })
        };
        fetch('https://www.google.com/recaptcha/api/siteverify', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <div className='service-background'>
            <h1 className='heading'>The Visual Testing platform</h1>
            <div className="text-container">

                <h3>Issue Detection</h3>
                <p>Automatically detect and localise issues allowing for users to easily identify issues that appear in their user interface.</p>
                <h3>Real time results</h3>
                <p>Generates and displays results to the user and gives the user an option to email results.</p>
                <h3>How it works</h3>
                <p>Add a demo video?</p>
                <br />
                <button className='try-button g-recaptcha'
                    data-sitekey="6Ld8T6oaAAAAAAiXL5GN6HdNsHGHHBXxJ3eVPkUn"
                    data-callback='onSubmit'
                    data-action='submit'>
                    Try Now
                </button>
            </div>
        </div>
    );
}

export default Service;
