import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

export default class GoogleLoginButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    /*
    axios.post("https://www.googleapis.com/oauth2/v4/token", {
      code: response.code,
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      client_secret:  process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: "https://takukobayashi.github.io/AutoSlideGenerator/",
    }).then(decoded => {
      console.log(decoded);
    })
    */
    this.props.googleLogin({
      profileObj: response.profileObj,
      tokenObj: response.tokenObj,
      accessToken: response.accessToken,
      googleId: response.response,
      tokenId: response.tokenId,
    });
  }

  render() {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        responseType="id_token code"
        accessType="online"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}
