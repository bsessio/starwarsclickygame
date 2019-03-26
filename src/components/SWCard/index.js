// Depend on React, add some styles.
import React from "react";
import "./style.css";

// Create the responsive boxes for the clicky pictures.
function SWCard(props) {
  return (
    <div className="card">
      <div className="img-container" onClick={() => props.select(props.id)}>
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
}

// Exports it
export default SWCard;