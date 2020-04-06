import React, { Component } from "react";
import { BrightnessSliderComponent } from "../components/BrightnessSlider/";
import { ToggleSwitchComponent } from "../components/ToggleSwitch/";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <BrightnessSliderComponent />
        <ToggleSwitchComponent />
      </div>
    );
  }
}

export default App;
