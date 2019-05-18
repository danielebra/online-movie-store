// React and redux modules
import React, { Component } from "react";
import YouTube from 'react-youtube';
import $ from 'jquery';

let isPlaying = false;
class Trailer extends Component {

  onReady(event) {
    let video = document.getElementById("video");
	  video.addEventListener("click", function() {
      if (isPlaying) {
        event.target.pauseVideo();
        isPlaying = false;
      } else {
        event.target.playVideo();
        isPlaying = true;
      }
	  });
  }

  render() {
    let { trailer_link } = this.props.movie;
    let videoId = trailer_link.split("/")[4];

    trailer_link += '?rel=0&hd=1&controls=0&modestbranding=1&showinfo=0&autoplay=0&autohide=1&fs=0enablejsapi=1';

    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        controls: 0,
        rel: 0,
        iv_load_policy: 3,
        showinfo: 0,
        modestBranding: 1,
        autohide: 1,
        fs: 0,
        hd: 1,
        showRelatedVideos: 0
      }
    };

    return (
      <div id="video" className="movie-tabs">
        <div className="videoWrapper">
          <YouTube className="trailer" videoId={videoId} opts={opts} onReady={this.onReady}/>
        </div>
      </div>
    );
  }
}

export default Trailer;
