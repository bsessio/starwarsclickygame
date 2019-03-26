// Dependencies for react and style
import React from "react";
import "./style.css";

// Makes the Wrapper tag.
function Wrapper(props) {
  return <div className="wrapper">{props.children}</div>;
}

// Exports Wrapper
export default Wrapper;