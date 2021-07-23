import React, { useEffect } from "react";

const Captcha = () => {
  useEffect(() => {
    // Render the CAPTCHA
    grecaptcha.ready(function () {
      grecaptcha.render("recaptcha-container", {
        sitekey: "6Lc-qMwaAAAAALR6X4MS9IldpVTnK8H47cAylpqA",
        size: "invisible",
        callback: handleCallback.name,
      });
    });

    // Function to handle CAPTCHA callback
    function handleCallback(token) {
      // Send request to back-end server
      fetch(`${__SERVER__}/captcha/validate_captcha?token=${token}`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          // Dispatch CAPTCHA event
          document
            .getElementById("handleCallbackScript")
            .dispatchEvent(new CustomEvent("captchaEvent", { detail: data }));
        });
    }

    // Create a handleCallback script element for reCaptcha to execute callback function for. Needs to be present in the DOM.
    const scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.async = true;
    scriptElement.innerHTML = handleCallback.toString();
    scriptElement.id = "handleCallbackScript";
    document.body.appendChild(scriptElement);
  }, []);

  return <div id="recaptcha-container" />;
};

export default Captcha;
