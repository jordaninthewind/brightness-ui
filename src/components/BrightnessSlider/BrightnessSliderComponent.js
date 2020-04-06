import React from "react";
import PropTypes from "prop-types";
import "./BrightnessSliderComponent.css";

const BrightnessSliderComponent = (props) => {
  return (
    <div className="slider">
      <h2>Brightness</h2>
      <input
        type="range"
        min="0"
        max="1"
        step=".1"
        disabled={props.disabled}
        value={props.currentBrightness}
        onChange={props.onUpdateBrightness}
      />
    </div>
  );
};

BrightnessSliderComponent.propTypes = {
  onUpdateBrightness: PropTypes.func,
  value: PropTypes.number,
  disabled: PropTypes.bool,
};

export default BrightnessSliderComponent;
