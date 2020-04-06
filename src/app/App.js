import React, { Component } from "react";
import { BrightnessSliderComponent } from "../components/BrightnessSlider/";
import { ToggleSwitchComponent } from "../components/ToggleSwitch/";
import * as Actions from "../Actions";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    // initial state adds disabled to debounce light update requests
    this.state = {
      id: undefined,
      name: undefined,
      on: undefined,
      brightness: undefined,
      error: undefined,
      disabled: false,
    };
  }

  // no error handling because idempotent response on backend
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
      this.setState({
        disabled: true,
      });
      const update = await Actions.updateBrightness(newBrightness);

      if (update.error) throw new Error(update.error);

      this.setState({
        error: undefined,
        brightness: newBrightness,
        disabled: false,
      });
    } catch (err) {
      this.setState({
        error: err.message,
        disabled: false,
      });
    }
  };

  toggleLight = async () => {
    const state = this.state.on;
    try {
      const update = await Actions.toggleLight(!state);

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
      <div className="light-ui-container">
        <h1>{this.state.name}</h1>
        <ToggleSwitchComponent
          isLightOn={this.state.on}
          onToggleLight={this.toggleLight}
        />
        {this.state.on && (
          <>
            <BrightnessSliderComponent
              currentBrightness={this.state.brightness}
              onUpdateBrightness={this.updateLightBrightness}
              disabled={this.state.disabled}
            />
            <h2>{this.state.brightness * 100 + "%"}</h2>
          </>
        )}
        {this.state.error && <div className="error">{this.state.error}</div>}
      </div>
    );
  }
}

export default App;
