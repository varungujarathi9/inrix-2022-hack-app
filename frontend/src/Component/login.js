import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default class login extends Component {
  render() {
    return (
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter number"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
          <Link className="nav-link" to={'/map'} >
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </Link>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}