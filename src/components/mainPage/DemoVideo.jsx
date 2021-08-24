import React from "react";
import PropTypes from "prop-types";

const DemoVideo = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      className="demo-vid"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allowFullScreen
    />
  </div>
);

DemoVideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default DemoVideo;
