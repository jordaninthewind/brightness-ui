import React from "react";

const ToggleSwitchComponent = (props) => {
  return (
    <div className="toggle-switch">
      <h2>Light Status</h2>
      {props.isLightOn ? (
        <button onClick={props.onToggleLight}>On</button>
      ) : (
        <button onClick={props.onToggleLight}>Off</button>
      )}
    </div>
  );
};

export default ToggleSwitchComponent;
