import { marker } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Map.css";
import * as L from "leaflet";
import Modal from './Modal';
import incidents  from './fetchIncidents';
import axios from 'axios'

function Map() {
  let incidentArray = [];

  const [incidentArray1, setIncidentArray1] = useState([]);
  const userLatitude = 37.757386;
  const userLongitude = -122.490667;

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
    setTimeout(showModalFn, 10000)
  },[])



  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    return () => {};
  }, [incidentArray1]);

  const queryString =
    "https://api.iq.inrix.com/v1/incidents?point=" +
    userLatitude +
    "%7C" +
    userLongitude +
    "&radius=500&incidentoutputfields=All&incidenttype=Incidents,RoadWeather&locale=en";

  var config = {
    method: "get",
    url: queryString,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6IjhiNjFiMGI4N2NlMTg3MjI1MGY5ODU1OWExZmJhMGQzIiwiY29udGVudCI6ImEwNWFmNmRlODY2ZDdmY2JhOTk5NTdhN2U3OTU1YjA5YzQ3NWQ3ODEzMmIxNGI0NTBiMjMyZDhjZWM5YmM5ZWJkZDY1NzI3YmE4NTRmZjc4NGVlZjZjMjNlNDY2MmIyZWUzNjZmNmYzNWE3MjkxNDYzZmUyOGMyNWI3OWYyNGEzMzcyOWQ3MDhmMTQxN2I5YWE3ZWVhOTMyMWUzZTM1NTJjYjZlYzMxMDRjNzlmYjUwZDM2YWYwOTRmNjk5OTI0MTFmOWIxOGIyODdhZGVhNjFmNmIzZmI4ZDRmZDk5YjJlYWUzMzlkYzI1NDE0MGQ0NjY0NzAzNGE1YmM2YzlhOWIzZjdmMDAxYmZiYmE4Y2ExNjA4NGE3ZjQ5Y2I1ZjEzZTM0ODE3NjNmYmU0YmY0YzQ0OGJmMDkxNDVkODI1YzE0ZDZhMzBiNzBiOTU0NzFjZmZlYjMxN2QyZjNjZGE3MzA4YjZlMGQ4YWNlNWYyZjZkMzFmNGY0OTVjY2EzYjdmZDQ5OGRkODc1NDQ1ODMwZjExMjBkZjZjN2U4NmU0NDI5Y2IzOTE4OWI0ZjhjOTk1YjZmYjYxMWYxZDEyZWQxNTQ4ZTFmMDEwMDhkMzNlMDZlNDg1NjI1ZDUyNGNkOGIwMGVkMDBkMjkxNmI1MTY5MTQ5ZjhkZmI2MmQwMjVkYjdlODFmYzIyYmQ5MDY2ZDJjMDBiN2U2ZmM0ZmYwNmFjOTA5MzUyYjYwN2QwNDRjOTY4YTg5MmIzNjk1OGNhYjViNDY5ZjJmOTIzYWJlMjI1OTc5NDgyZGRlMjRhNDhmZjI2NGZjYTRkN2FkMjI0ZjVhMGQ0NmIxN2MxODNhYjdlZTRjY2Q2NGY5MTRhYTRmZjY1ZTExNTA4In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI4YjYxYjBiODdjZTE4NzIyNTBmOTg1NTlhMWZiYTBkMyIsImNvbnRlbnQiOiJiMjY2ZjlkNWM5NWI1ODkyYjVjNjQ0ZGVlMDg5NjY2ZGQyNWFlOTg3NGZhODI5M2QxODI4MmVkNmNjOTc4YWViYTE3NzUwN2FmMTA4ZTI0MDQ4YzQ2OTFkIn0sImp0aSI6ImM3NWQyYTZmLTAxZDMtNDE4Ni1hZWFmLTNkZDAyYmFmZjM5NiIsImlhdCI6MTY2ODMzNjI1OCwiZXhwIjoxNjY4MzM5ODU4fQ.0qwpOprSVpNhiB5CsLRuB5ctrBS6aJhpbWYb1IyeaBg",
    },
  };

  async function fetchMap() {
    const response = await fetch(queryString, config);
    const text = await response.json();

    const result = text.result;
    console.log(result);
    
    try {
      for (const incident of result.incidents) {
        const latitude = incident.geometry.coordinates[1];
        const longitude = incident.geometry.coordinates[0];

        const description = incident.descriptions[0].desc;

        let obj = {
          lat: latitude,
          lon: longitude,
          desc: description,
        };

        incidentArray.push(obj);
      }
      console.log(incidentArray);
      setIncidentArray1(incidentArray);
      // console.log(incidentArray);
    } catch (err) {
      // console.log(err);
    }
  }
  fetchMap();

  return (
    <div className="Map">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
      
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>*/
                <><li className="nav-item">
                      <button class="button-no"> SOS </button>
                    </li>
                    </> 
                }
              </ul>
            </div>
            </div>
      </nav>
      <Modal show={showModal} handleCloseYes={hideModalFnYes} handleCloseNo={hideModalFnNo}>
        <h4>An incident alert has already been sent to 911. Are you safe?</h4>
      </Modal>
      <MapContainer
        center={[37.765297, -122.442527]}
        zoom={20}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[37, -122]}>
          <Popup></Popup>
        </Marker>
        <Marker position={[40, -130]}>
          <Popup></Popup>
        </Marker> */}
        <Marker icon={greenIcon} position={[37.765297, -122.442527]}>
          <Popup>Current Location</Popup>
        </Marker>
        {incidentArray1?.map((item) => (
          <Marker icon={redIcon} position={[item.lat, item.lon]}>
            <Popup>{item.desc}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;