import React from 'react';
import logo from './AutoSlideGeneratorLogo.png';
import './App.css';
import GenerateSlideForm from './compoments/generate-slide-form';
import GoogleLoginButton from './compoments/google-login-button';
import purecss from 'purecss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GoogleLoginButton />
        <img src={logo} className="App-logo" alt="logo" />
        <GenerateSlideForm />
      </header>
    </div>
  );
}

export default App;
