import React from "react";

const ToggleSwitchComponent = (props) => {
  return (
    <div className="toggle-switch">
      Light Status
      <input 
        type="checkbox"
        value={props.isLightOn}
        onChange={props.onToggleLight}
      />
    </div>
  );
};

export default ToggleSwitchComponent;
