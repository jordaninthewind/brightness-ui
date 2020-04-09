import React, { Component } from "react";
import { BrightnessSliderComponent } from "../components/BrightnessSlider/";
import { ToggleSwitchComponent } from "../components/ToggleSwitch/";
import * as actions from "../Actions";
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
    } = await actions.getLightState();

    this.setState({
      name,
      id,
      on,
      brightness,
    });
  }

  updateLightBrightness = async (event) => {
    if (!this.state.disabled) {
      try {
        const newBrightness = event.target.value;
        this.setState({
          disabled: true,
        });
        const update = await actions.updateBrightness(newBrightness);

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

      return false;
    }
  };

  toggleLight = async () => {
    const state = this.state.on;
    try {
      const update = await actions.toggleLight(!state);

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
        <div className="light-name">{this.state.name}</div>
        <ToggleSwitchComponent
          isLightOn={this.state.on}
          onToggleLight={this.toggleLight}
        />
        <div
          className={
            "brightness-container " + (this.state.on ? "expanded" : "")
          }
        >
          <>
            <BrightnessSliderComponent
              currentBrightness={this.state.brightness}
              onUpdateBrightness={this.updateLightBrightness}
              disabled={this.state.disabled}
            />
            <div className="light-percentage">
              {this.state.brightness * 100 + "%"}
            </div>
          </>
        </div>
        <div
          className="error"
          style={{ visibility: !this.state.error ? "hidden" : "inherit" }}
        >
          {this.state.error || "something"}
        </div>
      </div>
    );
  }
}

export default App;
