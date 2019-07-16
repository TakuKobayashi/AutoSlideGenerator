import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

export default class GoogleLoginButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  responseGoogle(response) {
    console.log(response);
    this.props.googleLogin(response);
  }

  render() {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        responseType="code"
        accessType="offline"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}
