// React and redux modules
import React, { Component } from "react";

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
