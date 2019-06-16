import React from 'react';
import purecss from 'purecss';
import axios from 'axios';

export default class GenerateSlideForm extends React.Component{
  constructor(props) {
    super(props);

    this.generateSlideSubmit = this.generateSlideSubmit.bind(this);
  }

  generateSlideSubmit(event){
    console.log(process.env.REACT_APP_API_ROOT_URL);
    axios.get(process.env.REACT_APP_API_ROOT_URL).then(res => {
      console.log(res);
    })
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.generateSlideSubmit} className="pure-form">
        <input type="text" name="q" />
        <input type="submit" value="作成する" className="pure-button pure-button-primary" />
      </form>
    );
  }
}