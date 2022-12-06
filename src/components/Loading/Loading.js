import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <figure className="loader">
        <div className="dot white"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </figure>
    </div>
  );
};

export default Loading;
