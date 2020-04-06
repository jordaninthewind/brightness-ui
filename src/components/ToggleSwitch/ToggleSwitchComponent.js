import React from "react";
import PropTypes from 'prop-types';
import './ToggleSwitchComponent.css';

const ToggleSwitchComponent = (props) => {
  return (
    <div className="toggle-switch">
      {props.isLightOn ? (
        <button onClick={props.onToggleLight}>On</button>
      ) : (
        <button onClick={props.onToggleLight}>Off</button>
      )}
    </div>
  );
};

ToggleSwitchComponent.propTypes = {
  isLightOn: PropTypes.bool,
  onToggleLight: PropTypes.func
}

export default ToggleSwitchComponent;
