import React from "react";
import PropTypes from "prop-types";
import "./BrightnessSliderComponent.css";

const BrightnessSliderComponent = ({
  on,
  brightness,
  onUpdateBrightness,
  value,
}) => {
  return (
    <div className={"brightness-container " + (on ? "expanded" : "")}>
      <div className="brightness-title">Brightness</div>
      <input
        type="range"
        min="0"
        max="1"
        step=".1"
        value={brightness}
        onChange={onUpdateBrightness}
      />
      <div className="brightness-value">
        {Math.floor(brightness * 100) + "%"}
      </div>
    </div>
  );
};

BrightnessSliderComponent.propTypes = {
  brightness: PropTypes.number,
  onUpdateBrightness: PropTypes.func,
  value: PropTypes.number,
  on: PropTypes.bool,
};

BrightnessSliderComponent.defaultProps = {
  on: false
}

export default BrightnessSliderComponent;
