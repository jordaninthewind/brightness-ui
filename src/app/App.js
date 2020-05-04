import React, { Component } from "react";
import { BrightnessSliderComponent } from "../components/BrightnessSlider/";
import { OnOffSwitchComponent } from "../components/OnOffSwitch/";
import * as actions from "../Actions";
import "./App.css";
import ColorSelectorComponent from "../components/ColorSelector";

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
      loading: false,
      color: undefined
    };
    this.inputRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const {
      data: {
        light: { brightness, id, name, on, color },
      },
    } = await actions.getLightState();

    this.setState({
      brightness,
      id,
      loading: false,
      name,
      color,
      on: on === "on" ? true : false,
    });
  }

  async componentDidUpdate(_, prevState) {
    if (
      this.state.brightness &&
      prevState.brightness !== this.state.brightness
    ) {
      const {
        data: {
          light: { brightness },
        },
      } = await actions.getLightState();

      this.setState({
        brightness,
      });
    }
  }

  updateLightBrightness = async () => {
    if (!this.state.loading) {
      try {
        this.setState({
          loading: true,
        });

        const newBrightness = parseFloat(this.inputRef.current.value);
        const update = await actions.updateBrightness(newBrightness);

        if (update.error) throw new Error(update.error);

        this.setState({
          error: null,
          brightness: newBrightness,
          loading: false,
        });
      } catch (err) {
        this.setState({
          error: err.message,
          loading: false,
        });
      }

      return false;
    }
  };

  turnLightOnOff = async () => {
    const { on } = this.state;
    try {
      this.setState({
        loading: true,
      });

      const { data, error } = await actions.turnLightOnOff(!on);

      if (error) throw new Error(error);

      this.setState({
        error: null,
        on: data.turnOnOffLight.light.power === "on" ? true : false,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err.message,
        loading: false,
      });
    }
  };

  changeLightColor = color => {
    this.setState({ color: color.hex });
    actions.changeLightColor(color.hex);
  };

  render() {
    return (
      <div className="light-ui-container">
        <div className="light-name">{this.state.name}</div>
        {this.state.on && (
          <>
            <BrightnessSliderComponent
              on={this.state.on}
              brightness={this.state.brightness}
              onUpdateBrightness={this.updateLightBrightness}
              inputRef={this.inputRef}
            />
            <ColorSelectorComponent
              color={this.state.color}
              onChangeColor={this.changeLightColor}
            />
          </>
        )}
        <div
          className="error"
          style={{ visibility: !this.state.error ? "hidden" : "inherit" }}
        >
          {this.state.error || "Spacing Placeholder"}
        </div>
        <OnOffSwitchComponent
          isLightOn={this.state.on}
          onToggleLight={this.turnLightOnOff}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default App;
