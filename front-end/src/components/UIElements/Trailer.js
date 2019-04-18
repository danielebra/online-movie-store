// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class Trailer extends Component {
  render() {
    return (
      <div>
        <iframe
          className="trailer"
          src="https://www.youtube.com/embed/_Qnop-08y34?controls=0"
        />
      </div>
    );
  }
}

export default Trailer;
