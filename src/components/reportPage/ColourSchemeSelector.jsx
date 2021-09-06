import React, { useEffect, useState, useRef } from "react";
import { inferno256, viridis256, magma256, jet256 } from "./gradients256";
import InfernoImage from "../images/inferno256.png";
import JetImage from "../images/jet256.png";
import MagmaImage from "../images/magma256.png";
import ViridisImage from "../images/viridis256.png";
import "./colour-scheme-selector.css";

const ColourSchemeSelector = ({ setColourScheme }) => {
  const colourSchemes = [
    { name: "Inferno", previewImage: InfernoImage, gradient: inferno256 },
    { name: "Jet", previewImage: JetImage, gradient: jet256 },
    { name: "Magma", previewImage: MagmaImage, gradient: magma256 },
    { name: "Viridis", previewImage: ViridisImage, gradient: viridis256 },
  ];

  // used to change sticky element color
  // shamelessly stolen from https://stackoverflow.com/questions/16302483/event-to-detect-when-positionsticky-is-triggered
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef();

  // mount
  useEffect(() => {
    const cachedRef = stickyRef.current,
      observer = new IntersectionObserver(([e]) => setIsSticky(e.intersectionRatio < 1), {
        threshold: [1],
      });

    observer.observe(cachedRef);

    // unmount
    return function () {
      observer.unobserve(cachedRef);
    };
  }, []);

  return (
    <>
      <p className="color-scheme-label">Select heatmap colour scheme:</p>
      <div
        className={"colour-scheme-selector-container" + (isSticky ? " isSticky" : "")}
        ref={stickyRef}
      >
        {colourSchemes.map((scheme, i) => (
          <button
            key={`scheme-${i}`}
            className="colour-scheme-container"
            style={{ backgroundImage: `url(${scheme.previewImage})` }}
            onClick={() => setColourScheme(scheme.gradient)}
          >
            <p className="colour-scheme-label">{scheme.name}</p>
          </button>
        ))}
      </div>
    </>
  );
};

export default ColourSchemeSelector;
