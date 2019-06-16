import React from 'react';
import logo from './logo.svg';
import './App.css';
import purecss from 'purecss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form class="pure-form">
          <input type="text" name="q" />
          <input type="submit" value="作成する" class="pure-button pure-button-primary" />
        </form>
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
