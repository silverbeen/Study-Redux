import React, { Component } from "react";

import "./App.css";
import CounterContainer from "./container/CounterContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CounterContainer />
      </div>
    );
  }
}

export default App;
