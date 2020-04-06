import React from "react";

const BrightnessSliderComponent = (props) => {
  return (
    <div className="slider">
      <h2>Brightness</h2>
      <input
        disabled={props.disabled}
        type="range"
        min="0"
        max="1"
        step=".1"
        value={props.currentBrightness}
        onChange={props.onUpdateBrightness}
      />
    </div>
  );
};

export default BrightnessSliderComponent;
