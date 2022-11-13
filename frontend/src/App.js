import React, { useState } from 'react';
import Modal from './Modal';
import { findIncident } from './axios';

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false)
  
  const showModalFn = (e) => setShowModal(!showModal)
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
  }

  return (
    <div className="App">
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      <button onClick={e => {
            showModalFn(e);
          }}>show Modal{" "}</button>

        <Modal show={showModal}>
          <p>shortDescription happened near you.</p>
          <p>Are you Safe?</p>
        </Modal>
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
