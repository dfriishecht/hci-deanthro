import React from "react";
import "./styles/TooltipIcon.css";

const TooltipIcon = ({ text }) => {
  return (
    <div className="tooltip-container">
      <span className="tooltip-icon">?</span>
      <div className="tooltip-box">{text}</div>
    </div>
  );
};

export default TooltipIcon;