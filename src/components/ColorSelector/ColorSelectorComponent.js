import React from "react";
import { ChromePicker } from "react-color";
import "./ColorSelectorComponent.css";

const ColorSelectorComponent = ({ color, onChangeColor }) => (
  <ChromePicker color={color} onChangeComplete={onChangeColor} />
);

export default ColorSelectorComponent;
