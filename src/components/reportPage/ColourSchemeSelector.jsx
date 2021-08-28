import React from "react";

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

  return (
    <div className="colour-scheme-selector-container">
      <p>Select heatmap colour scheme:</p>
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
  );
};

export default ColourSchemeSelector;
