import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class OrderCard extends Component {
  render() {
    const { movie } = this.props;

    return (
     <div class="row">
     <div class="col s12">
     <div class="card red darken-1">
     <div class="row">
     
     </div>
     </div>
     </div>
     </div>
    );
  }
}

export default MovieCard;