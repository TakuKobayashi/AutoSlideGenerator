import React from 'react';
import logo from './AutoSlideGeneratorLogo.png';
import backgroundVideoMP4 from './Background.mp4';
import backgroundVideoWebm from './Background.webm';
import backgroundVideoJpg from './Background.jpg';
import './App.css';
import GenerateSlideForm from './compoments/generate-slide-form';
import GoogleLoginButton from './compoments/google-login-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    return (
      <div className="App">
        <video autoPlay loop muted poster={backgroundVideoJpg} id="bgvid">
          <source src={backgroundVideoWebm} type="video/webm" />
          <source src={backgroundVideoMP4} type="video/mp4" />
        </video>
        <GoogleLoginButton {...this.props} />
        <img src={logo} className="App-logo" alt="logo" />
        <GenerateSlideForm {...this.props} />
      </div>
    );
  }
}

export default App;
