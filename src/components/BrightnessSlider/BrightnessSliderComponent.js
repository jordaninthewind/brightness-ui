import React from "react";

const BrightnessSliderComponent = (props) => {
  return (
    <div className="slider">
      Brightness
      <input 
        type="range"
        min="0"
        max="1"
        step=".1"
        defaultValue={props.currentBrightness}
        onChange={props.onUpdateBrightness}
      />
    </div>
  );
};

export default BrightnessSliderComponent;
