import React, { useState } from 'react';
import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  render() {
    return (
        <div class="modal" id="modal">
        <h2>Modal Window</h2>
        <div class="content">{this.props.children}</div>
        <div class="actions">
          <button class="toggle-button" onClick={this.show}>YES</button>    <button class="toggle-button" onClick={this.show}>NO</button>
        </div>

      </div>
    );
  }
}
Modal.propTypes = {
  show: PropTypes.bool.isRequired
};

