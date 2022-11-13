import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { findIncident } from './axios';
import './modal.css';

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState("false")
  const [poll, setPoll] = useState(false)

  const showModalFn = () => {
    setShowModal("true")
  }

  const hideModalFn = () => {
    setShowModal("false")
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
            //showModalFn()
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


  return (
    <div className="App">
      <h3>Coordinates</h3>
      <p>{status}</p>
      {lat && <p><b>Latitude:</b> {lat}</p>}
      {lng && <p><b>Longitude:</b> {lng}</p>}

      <button type="button" onClick={showModalFn}>
        Open
      </button>

      {showModal && <p><b>showModal:</b> {showModal}</p>}
      <Modal show={showModal} handleClose={hideModalFn}>
        <h2>Are you safe?</h2>
      </Modal>

      <div className="modal1">
        <div className="modal-content1">
          <span className="close1">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>

    </div>
    );
  }

  export default App;


