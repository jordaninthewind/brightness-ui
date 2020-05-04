import React from "react";
import { SliderPicker } from "react-color";
import "./ColorSelectorComponent.css";

const ColorSelectorComponent = ({ color, onChangeColor }) => (
  <SliderPicker 
    color={color} 
    onChangeComplete={onChangeColor} 
  />
);

export default ColorSelectorComponent;
