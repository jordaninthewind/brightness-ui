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

  updateLightBrightness = async (event) => {
    try {
      const newBrightness = event.target.value;
      const update = await Actions.updateBrightness(newBrightness);

      if (update.error) throw new Error(update.error);

      this.setState({
        error: undefined,
        brightness: newBrightness,
      });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  };

  toggleLight = async (state) => {
    try {
      const turnOnOffLight = await Actions.toggleLight(!state);
      const update = await turnOnOffLight.json();

      if (update.error) throw new Error(update.error);

      this.setState({
        error: undefined,
        on: !state,
      });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
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
          onUpdateBrightness={this.updateLightBrightness}
        />
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}

export default App;
