import React, { useEffect } from "react";
import './service.css';

const Service = () => {
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
                <button>Try Now</button>
            </div>
        </div>
    );
}

export default Service;
