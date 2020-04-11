import React from "react";
import PropTypes from "prop-types";
import "./OnOffSwitchComponent.css";

const OnOffSwitchComponent = ({ onToggleLight, isLightOn, loading }) => {
  return (
    <div className="toggle-switch">
      <button onClick={onToggleLight}>{isLightOn ? "On" : "Off"}</button>
      {loading && <div className="spinner" />}
    </div>
  );
};

OnOffSwitchComponent.propTypes = {
  isLightOn: PropTypes.bool,
  onToggleLight: PropTypes.func,
  loading: PropTypes.bool,
};

export default OnOffSwitchComponent;
