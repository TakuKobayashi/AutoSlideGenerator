import React from 'react';
import logo from './AutoSlideGeneratorLogo.png';
import './App.css';
import GenerateSlideForm from './compoments/generate-slide-form';
import GoogleLoginButton from './compoments/google-login-button';
import purecss from 'purecss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.accounts = {
      google: {},
    }
  }

  render(){
    const googleAccount = this.accounts.google;
    return (
      <div className="App">
        <header className="App-header">
          <GoogleLoginButton googleAccount={googleAccount} />
          <img src={logo} className="App-logo" alt="logo" />
          <GenerateSlideForm googleAccount={googleAccount} />
        </header>
      </div>
    );
  }
}

export default App;
