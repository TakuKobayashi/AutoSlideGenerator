import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

export default class GoogleLoginButton extends React.Component{
  constructor(props) {
    super(props);
  }

  responseGoogle(response) {
    this.props.googleAccount = response;
    console.log(response);
  }

  render(){
    console.log(process.env);
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}