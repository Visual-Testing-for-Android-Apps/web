import React, { useEffect, useState } from "react";
import { encodeFileAsBase64DataUrl } from "../../util/FileUtil";
import "./results-page.css";

/**
 * A video result consists of the original video and an explanation of the detected design violation.
 * @param {File} videoFile
 * @param {{ classification: String, explanation: String }}
 * @returns
 */
const VideoResult = ({ videoFile, videoResult }) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(async () => {
    setDataUrl(await encodeFileAsBase64DataUrl(videoFile));
  }, []);

  const mapVideoIssueToExplanation = (issueClassification) => {
    if (issueClassification == null)
      return <p className="video-result-explanation">Error analysing video</p>;
    const explanation = (
      <div className="video-result-explanation">
        {
          [
            <>Looks good! No design violations found.</>,
            <>
              <h2>Material passing through other material.</h2>
              Material cannot pass through other Material.
              <br />
              Learn more{" "}
              <a href="https://material.io/design/environment/surfaces.html#properties">here</a>
            </>,
            <>
              <h2>Missing scrim.</h2>
              <p>
                Scrims are temporary treatments that can be applied to Material surfaces for the
                purpose of making content on a surface less prominent. They help direct user
                attention to other parts of the screen, away from the surface receiving a scrim.
                <br />
                Learn more{" "}
                <a href="https://material.io/design/environment/surfaces.html#attributes">here</a>
              </p>
            </>,
            <>
              <h2>Snackbar blocking bottom navigation.</h2>
              <p>
                Avoid placing a snackbar in front of frequently used touch targets or navigation.
                <br />
                Learn more <a href="https://material.io/components/snackbars#placement">here</a>
              </p>
            </>,
            <>
              <h2>Stacking multiple banners.</h2>
              <p>
                Only one banner should be displayed at a time.
                <br />
                Learn more <a href="https://material.io/components/banners">here</a>
              </p>
            </>,
            <>
              <h2>Card flipping.</h2>
              <p>
                Cards shouldn't flip to reveal information.
                <br />
                Learn more <a href="https://material.io/components/cards#anatomy">here</a>
              </p>
            </>,
            <>
              <h2>Moving cards behind other cards.</h2>
              <p>
                Don’t move cards behind other cards.
                <br />
                When moving a card, increase its elevation.
                <br />
                Learn more <a href="https://material.io/components/cards#behavior">here</a>
              </p>
            </>,
            <>
              <h2>Stacking multiple snackbars.</h2>
              <p>
                Avoid stacking snackbars ontop of one another.
                <br />
                When multiple snackbar updates are necessary, they should appear one at a time.
                Learn more <a href="https://material.io/components/snackbars#behavior">here</a>
              </p>
            </>,
            <>
              <h2>Missing elevation.</h2>
              <p>
                Components such as dialogs and menus should have elevation to provide contrast
                against other elements.
                <br />
                Learn more{" "}
                <a href="https://material.io/design/environment/elevation.html#elevation-in-material-design">
                  here
                </a>
              </p>
            </>,
            <>
              <h2>Modal sheet missing scrim.</h2>
              <p>
                Scrims are temporary treatments that can be applied to Material surfaces for the
                purpose of making content on a surface less prominent.
                <br />
                When showing a bottom sheet, it's important to show a scrim on background content to
                indicate it will not respond to user interaction.
                <br />
                Learn more{" "}
                <a href="https://material.io/components/sheets-bottom#modal-bottom-sheet">here</a>
              </p>
            </>,
          ][issueClassification]
        }
      </div>
    );
    return explanation;
  };

  return (
    <div className="video-result-container">
      <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <video className="result" src={dataUrl} autoPlay loop controls />
        <p className="result-filename">{videoFile.name}</p>
      </div>
      {mapVideoIssueToExplanation(videoResult?.classification)}
    </div>
  );
};

export default VideoResult;
