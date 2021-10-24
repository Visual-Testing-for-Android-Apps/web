import React from "react";
import "./about-us-page.css";

const AboutUsPage = () => {
  return (
    <div className="aboutUs-container">
      <div className="privacy-policy">
        <h2 className="title-text">
          <span className="c7">About Us</span>
        </h2>
        <p>
          <span className="c2">
            This project was created and worked on as part of a year long project by students at
            Monash University. Our team was tasked with creating a web application for testing
            android applications based on two algorithms, Owleye and Seenomaly. Both are accesible
            in our github repository{" "}
            <a href="https://github.com/Visual-Testing-for-Android-Apps">here</a>.
          </span>
        </p>
        <h3>
          <span className="c10">Our Team</span>
        </h3>
        <div className="team-container">
          <div className="team-list">
            <h4 className="team-name">Frontend</h4>
            <ul className="no-points">
              <li>Matti H</li>
              <li>Crystal T</li>
              <li>Damien S</li>
              <li>Akshith P</li>
              <li>Leanne B</li>
              <li>Zac W</li>
            </ul>
          </div>
          <div className="team-list">
            <h4 className="team-name">Backend Image</h4>
            <ul className="no-points">
              <li>Rebecca C</li>
              <li>Sukhdeep B</li>
              <li>Guru S</li>
              <li>Toney E</li>
              <li>Yinghao M</li>
            </ul>
          </div>
          <div className="team-list">
            <h4 className="team-name">Backend Video</h4>
            <ul className="no-points">
              <li>Alex D</li>
              <li>Collins M</li>
              <li>Josh S</li>
              <li>Lucille G</li>
              <li>Peter V</li>
              <li>Wil V</li>
            </ul>
          </div>
        </div>
        <p className="c5">
          <span className="c2">
            For more information about this project please contact Chunyang via this email:
            <br />
            <br />
            vision-report-response@gmail.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
