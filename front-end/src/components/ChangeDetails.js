import React, { Component } from "react";
import api from "../api";

export default class ChangeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Example: "Hello"
    };
    this.myFunction();
  }
  myFunction() {
    setTimeout(() => {
      this.setState({ Example: "World" });
    }, 3000);
  }
  render() {
    return (
      <div>
        <h1>{this.state.Example}</h1>
      </div>
    );
  }
}
