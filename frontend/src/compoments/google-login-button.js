import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

export default class GoogleLoginButton extends React.Component{
  constructor(props) {
    super(props);
  }

  responseGoogle(response) {
    console.log(response);
  }

  render(){
    return (
      <GoogleLogin
        clientId="534985088008-oqr6to2iu26j6eh2r7kiiqjbvmrdo194.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}