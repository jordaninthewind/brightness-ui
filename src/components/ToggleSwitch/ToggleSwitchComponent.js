import React from "react";

const ToggleSwitchComponent = (props) => {
  return (
    <div className="toggle-switch">
      Light Status
      {props.isLightOn ? (
        <button onClick={props.onToggleLight}>On</button>
      ) : (
        <button onClick={props.onToggleLight}>Off</button>
      )}
    </div>
  );
};

export default ToggleSwitchComponent;
