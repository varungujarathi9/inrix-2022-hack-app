import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Component/login'
import SignUp from './Component/signup'
import Location from './Location.js'
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { findIncident } from './axios';

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [poll, setPoll] = useState(false)

  const showModalFn = () => {
    setShowModal(true)
  }

  const hideModalFnYes = () => {
    setShowModal(false)
  }

  const hideModalFnNo = () => {
    setShowModal(false)
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    }
    else {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        findIncident(position.coords.latitude, position.coords.longitude)
        .then((res)=>{
          if(res){
            showModalFn()
          }
          else{
            setPoll(!poll)
          }
        })
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  };

  //on load
  useEffect(()=>{
    getLocation()
  },[])

  // // every 30s
  // useEffect(() => {
  //   const id = setInterval(getLocation, 30000)
  //   return () => clearInterval(id)
  // },[poll]);

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Hackathon
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/location'}>
                    Location
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/location" element={<Location />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App;
  // const render = () => {

  // return (
  //   <div className="App">
  //     <h3>Coordinates</h3>
  //     <p>{status}</p>
  //     {lat && <p><b>Latitude:</b> {lat}</p>}
  //     {lng && <p><b>Longitude:</b> {lng}</p>}

  //     <Modal show={showModal} handleCloseYes={hideModalFnYes} handleCloseNo={hideModalFnNo}>
  //       <h2>Are you safe?</h2>
  //     </Modal>

  //   </div>
  //   );
  // }

  // export default App;


