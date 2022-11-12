import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import { geolocated } from "react-geolocated";

class App extends Component {
  render() {
 
    // Check geolocation supported in
    // browser or not
    return this.props.isGeolocationAvailable ? (
 
      // Check location is enable in
      // browser or not
      this.props.isGeolocationEnabled ? (
 
        // Check coordinates of current
        // location is available or not
        this.props.coords ? (
          <div>
            <h1 style={{ color: "green" }}>GeeksForGeeks</h1>
            <h3 style={{ color: "red" }}>
              Current latitude and longitude of the user is
            </h3>
            <ul>
              <li>latitude - {this.props.coords.latitude}</li>
              <li>longitude - {this.props.coords.longitude}</li>
            </ul>
          </div>
        ) : (
          <h1>Getting the location data</h1>
        )
      ) : (
        <h1>Please enable location on your browser</h1>
      )
    ) : (
      <h1>Please, update your or change the browser </h1>
    );
  }
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default geolocated(App);
