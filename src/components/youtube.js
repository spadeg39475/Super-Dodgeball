import React from 'react';
import YouTube from 'react-youtube';

 
class Demo extends React.Component {
    videoOnReady(event) {
        // access to player in all event handlers via event.target
        // event.target.seekTo(0);
        event.target.pauseVideo();
      }
    //   https://www.youtube.com/watch?v=Gs7M6LuePgU
    //   https://youtu.be/Gs7M6LuePgU

  render() {
    const opts = {
      fitToBackground: true,
      height: '480',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
         autoplay: 0,
         rel: 0,
         iv_load_policy: 3,
         modestbranding: 1,
      }
    }
    const {videoId} = this.props
    
    return (
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={this.videoOnReady}
      />
    );
  }
}

export default Demo