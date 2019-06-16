import React from 'react';
import logo from './AutoSlideGeneratorLogo.png';
import './App.css';
import GenerateSlideForm from './compoments/generate-slide-form';
import purecss from 'purecss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GenerateSlideForm />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
