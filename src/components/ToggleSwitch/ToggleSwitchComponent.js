import React from "react";
import PropTypes from "prop-types";
import "./ToggleSwitchComponent.css";

const ToggleSwitchComponent = ({ onToggleLight, isLightOn, loading }) => {
  return (
    <div className="toggle-switch">
      <button onClick={onToggleLight}>{isLightOn ? "On" : "Off"}</button>
      {loading && <div className="spinner"></div>}
    </div>
  );
};

ToggleSwitchComponent.propTypes = {
  isLightOn: PropTypes.bool,
  onToggleLight: PropTypes.func,
  loading: PropTypes.bool,
};

export default ToggleSwitchComponent;
