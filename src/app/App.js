import React, { Component } from "react";
import { BrightnessSliderComponent } from "../components/BrightnessSlider/";
import { ToggleSwitchComponent } from "../components/ToggleSwitch/";
import * as Actions from "../Actions";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    // initial state
    this.state = {
      on: undefined,
      brightness: undefined,
      name: undefined,
      id: undefined,
      error: undefined,
    };
  }

  async componentDidMount() {
    const {
      data: {
        light: { on, brightness, name, id },
      },
    } = await Actions.getLightState();

    this.setState({
      name,
      id,
      on,
      brightness,
    });
  }

  updateLightBrightness = async (brightness) => {
    const update = await Actions.updateBrightness(brightness);
  };

  toggleLight = async (state) => {
    const turnOnOffLight = await Actions.toggleLight(!state);
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <ToggleSwitchComponent
          isLightOn={this.state.on}
          onToggleLight={this.toggleLight}
        />
        <BrightnessSliderComponent
          currentBrightness={this.state.brightness}
          onUpdateLight={this.updateLightBrightness}
        />
      </div>
    );
  }
}

export default App;
