import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import incidents  from './fetchIncidents';
import axios from 'axios'
//import client from 'twilio'

const Location = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [poll, setPoll] = useState(false)
  const alertTimeout = null;

  const showModalFn = () => {
    //alertTimeout = setTimeout(sendSms, 120000)
    setShowModal(true)
  }

  const hideModalFnYes = () => {
    setShowModal(false)
  }

  const hideModalFnNo = () => {
    axios.get("http://localhost:8000/")

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
        incidents(position.coords.latitude, position.coords.longitude)
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

  return (
    <div className="App">
      <h3>Coordinates</h3>
      <p>{status}</p>
      {lat && <p><b>Latitude:</b> {lat}</p>}
      {lng && <p><b>Longitude:</b> {lng}</p>}

      <Modal show={showModal} handleCloseYes={hideModalFnYes} handleCloseNo={hideModalFnNo}>
        <h4>An accident alert has already been sent to emergency services. Are you safe?</h4>
      </Modal>

    </div>
  );
}

export default Location;