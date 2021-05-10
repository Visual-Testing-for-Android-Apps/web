import React, { useEffect } from "react";

const Captcha = () => {
    useEffect(() => {
        grecaptcha.ready(function () {
            grecaptcha.render("recaptcha-container", {
                "sitekey": "6Lc-qMwaAAAAALR6X4MS9IldpVTnK8H47cAylpqA",
                "size": "invisible",
                "callback": handleCallback.name
            });
        });

        function handleCallback(token) {
            // Send request to back-end server
            const requestOptions = {
                method: 'GET',
            };
    
            fetch('http://localhost:3000/captcha/validate_captcha?token=' + token, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }
    
        const scriptElement = document.createElement("script")
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;
        scriptElement.innerHTML = handleCallback.toString()
        document.body.appendChild(scriptElement)
    }, [])

    return (
        <div id="recaptcha-container">
        </div>
    );
}

export default Captcha;
