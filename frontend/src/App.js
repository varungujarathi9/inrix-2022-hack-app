import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Component/login'
import SignUp from './Component/signup'
import Location from './Location.js'
import Map from './Map.js'
import { Modal } from 'bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              SafeDrive
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>*/
                <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Sign Up
                    </Link>
                  </li> 
                }
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
              <Route path="/map" element={<Map />} />
              <Route path="/sos" element={<Modal />} />
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


