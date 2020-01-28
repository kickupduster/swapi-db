import React, { Component } from 'react';

import Header from '../header';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false
  };



  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }



    return (
      <div className="stardb-app">
        <Header />
        <PeoplePage />
      </div>
    );
  }
}
