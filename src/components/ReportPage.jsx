import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const value=66;

const ReportPage = () => {
    return (
        <div >
        <h1>report page</h1>
        <div style={{ width: 200, height: 200 }}>
  <CircularProgressbar value={value} text={`${value }%`}/>
</div>
        </div>
    )
}

export default ReportPage;