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
    } = await Actions.getInitialState();

    this.setState({
      name,
      id,
      on,
      brightness,
    })

    console.log(this.state)
    return true;
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <ToggleSwitchComponent isLightOn={this.state.on}/>
        <BrightnessSliderComponent currentBrightness={this.state.brightness}/>
      </div>
    );
  }
}

export default App;
