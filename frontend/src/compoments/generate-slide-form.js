import React from 'react';
import purecss from 'purecss';
import axios from 'axios';

export default class GenerateSlideForm extends React.Component{
  constructor(props) {
    super(props);

    this.generateSlideSubmit = this.generateSlideSubmit.bind(this);
  }

  generateSlideSubmit(event){
    this.generateSlideRequest(event);
    event.preventDefault();
  }

  async generateSlideRequest(event){
    console.log(process.env.REACT_APP_API_ROOT_URL);
    const res = await axios.get(process.env.REACT_APP_API_ROOT_URL + "/slideGenerate")
    console.log(res);
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