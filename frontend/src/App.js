import React, { useState, useRef, useEffect } from 'react';
import { findIncident } from './axios';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(async (position) => {
        setStatus(null);
        await setLat(position.coords.latitude);
        await setLng(position.coords.longitude);
        findIncident(position.coords.latitude, position.coords.longitude)
        .then((res)=>{
          if(res)
          console.log("Show popup")
        })
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  };

  const render = () => {

  }
  return (
    <div className="App">
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      <Wrapper apiKey={"AIzaSyAW2iAEIXgn7LOJAmD95suqL4SrmTQTdn8"} render={render}>
      <div ref={ref} />
      </Wrapper>
    </div>
  );
}

export default App;


/*import logo from './logo.svg';
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

              //export default geolocated(App);
