import React, { Component } from 'react';

import './App.css';
import CounterContainer from './containers/CounterContainer';
import PaletteContainer from './containers/PaletteContainer';
import WaitingListContainer from './containers/WaitinfListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PaletteContainer />
        <CounterContainer />
        <WaitingListContainer />
      </div>
    );
  }
}

export default App;
