import React, { Component } from "react";
import { BrightnessSliderComponent } from "../components/BrightnessSlider/";
import { OnOffSwitchComponent } from "../components/OnOffSwitch/";
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
      loading: false,
    };
    this.inputRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const {
      data: {
        light: { brightness, id, name, on },
      },
    } = await actions.getLightState();

    this.setState({
      brightness,
      id,
      loading: false,
      name,
      on: on === "on" ? true : false,
    });
  }

  updateLightBrightness = async (event) => {
    if (!this.state.loading) {
      try {
        const newBrightness = this.inputRef.current.value;
        this.setState({
          loading: true,
        });

        const update = await actions.updateBrightness(newBrightness);

        if (update.error) throw new Error(update.error);

        this.setState({
          error: undefined,
          brightness: newBrightness,
          disabled: false,
          loading: false,
        });
      } catch (err) {
        this.setState({
          error: err.message,
          disabled: false,
          loading: false,
        });
      }

      return false;
    }
  };

  toggleLight = async () => {
    const state = this.state.on;
    try {
      this.setState({
        loading: true,
      });
      const update = await actions.toggleLight(!state);

      if (update.error) throw new Error(update.error);

      this.setState({
        error: undefined,
        on: !state,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err.message,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="light-ui-container">
        <div className="light-name">{this.state.name}</div>
        <OnOffSwitchComponent
          isLightOn={this.state.on}
          onToggleLight={this.toggleLight}
          loading={this.state.loading}
        />
        <BrightnessSliderComponent
          on={this.state.on}
          brightness={this.state.brightness}
          disabled={this.state.disabled}
          onUpdateBrightness={this.updateLightBrightness}
          inputRef={this.inputRef}
        />
        <div
          className="error"
          style={{ visibility: !this.state.error ? "hidden" : "inherit" }}
        >
          {this.state.error || "Spacing Placeholder"}
        </div>
      </div>
    );
  }
}

export default App;
