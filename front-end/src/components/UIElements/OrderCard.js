import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import movie from "../../images/movie.jpg";
class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="row">
        <div class="col s12">
          <div class="card red darken-3">
            <div class="row">
              <div className="col s4">
                <img src={movie} width="120" height="160" />
              </div>
              <div className="col s8">
                <div />
                <p>Movie Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCard;
