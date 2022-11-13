import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class NoModal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="nomodal" id="nomodal">
        <h2>Notification Window</h2>
        <div class="content">{this.props.children}</div>
        <div class="actions">
          <p>
            CHAL GAYA!
          </p>
        </div>
      </div>
    );
  }
}
NoModal.propTypes = {
  show: PropTypes.bool.isRequired
};