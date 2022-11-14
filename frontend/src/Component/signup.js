import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default class SignUp extends Component {
  render() {
    return (
      <form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="text" className="form-control" placeholder="Enter number" />
        </div>
        <div className="mb-3">
          <label>Emergency Contact Number</label>
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
        <div className="d-grid">
        <Link className="nav-link" to={'/map'} >
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          </Link>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}