import React from 'react';
import logo from './AutoSlideGeneratorLogo.png';
import backgroundVideoMP4 from './Background.mp4';
import backgroundVideoWebm from './Background.webm';
import backgroundVideoJpg from './Background.jpg';
import './App.css';
import GenerateSlideForm from './compoments/generate-slide-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    }
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID, //"clientID"は個人で取得する
        scope: "email"
      }).then(() => {
         const auth = window.gapi.auth2.getAuthInstance();
         console.log(auth);

         this.setState({ isSignedIn: auth.isSignedIn.get() });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <video autoPlay loop muted poster={backgroundVideoJpg} id="bgvid">
          <source src={backgroundVideoWebm} type="video/webm" />
          <source src={backgroundVideoMP4} type="video/mp4" />
        </video>
        <img src={logo} className="App-logo" alt="logo" />
        <GenerateSlideForm {...this.props} />
      </div>
    );
  }
}

export default App;
