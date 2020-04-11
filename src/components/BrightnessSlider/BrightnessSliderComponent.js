import React from "react";
import PropTypes from "prop-types";
import "./BrightnessSliderComponent.css";

const BrightnessSliderComponent = ({
  brightness,
  inputRef,
  on,
  onUpdateBrightness,
}) => {
  const percentage = (inputRef.current && inputRef.current.value) || brightness;

  return (
    <div className={"brightness-container " + (on ? "expanded" : "")}>
      <div className="brightness-title">Brightness</div>
      <input
        type="range"
        min="0"
        max="1"
        step=".01"
        defaultValue={brightness}
        onChange={onUpdateBrightness}
        ref={inputRef}
      />
      <div className="brightness-value">
        {Math.floor(percentage * 100) + "%"}
      </div>
    </div>
  );
};

BrightnessSliderComponent.propTypes = {
  brightness: PropTypes.number,
  onUpdateBrightness: PropTypes.func,
  inputRef: PropTypes.object,
  on: PropTypes.bool,
};

BrightnessSliderComponent.defaultProps = {
  on: false,
};

export default BrightnessSliderComponent;
