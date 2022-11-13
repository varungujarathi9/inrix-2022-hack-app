import { marker } from "leaflet";
import { useEffect, useState } from "react";
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6IjhhNTlmZmFlNTJmNzdkZmNjYzg5ZGE2Mjc2NjBmZjgyIiwiY29udGVudCI6Ijg5MGRmMDk3YmNjMDc3MGQ3ODcyZGQ5MDE2NTE4NmE1MjYwZjY4MWE4NTcyZjkzOWFhYTY4NDg0YzY0MTQ4ODc4MjU5OGEwYmFmNzE4MGI4ZDA4MDYwOWUzODAyZjZlZGIyYzY5Nzk2ZjVlODM4ZjQ0NmQzZjJhNmRiOTUyMjlmMWMxYjIwZDdhN2EyZmI4YzM1ZGM4YmFjZGIyNjY5OTI1OTExNTc2OGFkNzk4ZTlmOWU5NDI0OWQzMjZiNWNmZWQwMDVlYmU0ZWY2Njk3NGNhNjRkMzkxN2YwMDhkZDRlZDJjNjI5OTM0NjA3YmI5NTViMjBiNWM0MmViMTJiMzA5NzU0ZmMyYjg4Y2QwNzUxYWUyZmQyNGNmODJhMDM4OTE3YjM0NDgwNDFiMjk4MWJlNmRkY2I1NTYzMjBmMmUzZDcyMTIyMjk2MTMxN2ViZmU1MzZkZDQwZjM5ZTBiZmUxOWZjOGE1YWNjNzM5YzliYmZjNDk0YzQ3OTJkNzIxYjU3NTAyNTM0MTk0N2FjNTQ4YTI3OTU2NzRjOTIzNmZkNDcxYjcxMmZmZTU5ODFmMjRkN2ZmNTYwZTlhMTA1OWFhNzI3NTc5YjhmMjk5ZGUzNjJjZmFjMWM4OWM1YTUwMGYyYjQyMmRiNmIyN2Y2OWU3MzAyMzgzZWFlNDczOWNjMzJiMThkOTNmZGM0YTE3YzhiYjNiNGFmMDZmMjNhODAxNzJmYmZhOTAzNmI1OTg2N2YwNDJmNzk2NzA5M2NjOGQyZTBkMzY3MTI3YTRiNGI3MDFhMmM3NDMyNGU4OTI2YjdkOTQ5NjA0Zjg4N2E3MDJhZTY3ZmE3MmFiNDMzMGNmYjdkYzQ5ZjAwNDk4ZGFiM2Q4ZjkwIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI4YTU5ZmZhZTUyZjc3ZGZjY2M4OWRhNjI3NjYwZmY4MiIsImNvbnRlbnQiOiI5YzMyZjA5Mjg5YjE1MDE1MDQzMWVmZWQ3NDU4OTZkNjNlNTc0MjVlYWY1OWRlNDNhMGE2ZmFmMGJhMWE0MWFjOTg0M2YyN2JmMDc5YWZhN2NjOTY0N2EwIn0sImp0aSI6IjI3NTliZWVmLWMyZjYtNDg5ZC1iYmZlLWM2ZmQ4YWIxNmJjMiIsImlhdCI6MTY2ODMyOTUzOSwiZXhwIjoxNjY4MzMzMTM5fQ.-8KXLY2YT8l1-6nhE1ulR0-j9U4Grv-Bh2dr2PoL4As",
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
      <Modal show={showModal} handleCloseYes={hideModalFnYes} handleCloseNo={hideModalFnNo}>
        <h4>An accident alert has already been sent to emergency services. Are you safe?</h4>
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