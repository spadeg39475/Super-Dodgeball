import React from 'react';
import YouTube from 'react-youtube';

 
class Demo extends React.Component {
    
  state ={
    width:640,
    height:480
  }
  
  updateDimensions() {
    if(window.innerWidth < 650) {
      this.setState({ width: 320, height: 240 });
    } else {
      this.setState({ width: 640, height: 480 });
    }
  }


  videoOnReady(event) {
    // access to player in all event handlers via event.target
    // event.target.seekTo(0);
    event.target.pauseVideo();
  }
    //   https://www.youtube.com/watch?v=Gs7M6LuePgU
    //   https://youtu.be/Gs7M6LuePgU
    
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    console.log(this.state)
    const opts = {
      fitToBackground: true,
      height: `${this.state.height}`,
      width: `${this.state.width}`,
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