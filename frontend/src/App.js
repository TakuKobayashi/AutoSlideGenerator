import React from 'react';
import GoogleLogin from 'react-google-login';
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
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    this.setState({
      googleLogin: {
        profileObj: response.profileObj,
        tokenObj: response.tokenObj,
        accessToken: response.accessToken,
        googleId: response.response,
        tokenId: response.tokenId,
      },
    });
    console.log(this.state);
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <video autoPlay loop muted poster={backgroundVideoJpg} id="bgvid">
          <source src={backgroundVideoWebm} type="video/webm" />
          <source src={backgroundVideoMP4} type="video/mp4" />
        </video>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          Google SlideでSlideを作成する場合はGoogleにLoginしてください:
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            buttonText="Login"
            responseType="id_token code"
            accessType="online"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </p>
        <GenerateSlideForm {...this.props} />
      </div>
    );
  }
}

export default App;
