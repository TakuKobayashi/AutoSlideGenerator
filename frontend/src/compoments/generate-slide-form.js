import React from 'react';
import purecss from 'purecss';
import axios from 'axios';
import {Collapse} from 'react-collapse';
import Push from 'push.js';

export default class GenerateSlideForm extends React.Component{
  constructor(props) {
    super(props);

    this.generateSlideSubmit = this.generateSlideSubmit.bind(this);
  }

  generateSlideSubmit(event){
    if(Push.Permission.has()){
      Push.Permission.request(this.onGranted, this.onDenied);
    }else{
      this.generateSlideRequest();
    }
    event.preventDefault();
  }

  onGranted(){
    this.generateSlideRequest();
  }

  onDenied(){
    this.generateSlideRequest();
  }

  async generateSlideRequest(){
    console.log(process.env.REACT_APP_API_ROOT_URL);
    const res = await axios.post(process.env.REACT_APP_API_ROOT_URL + "/slide/generate")
    console.log(res);
  }

  render(){
    return (
      <form onSubmit={this.generateSlideSubmit} className="pure-form">
        <input type="text" name="q" />
        <Collapse isOpened={true || false}>
          <div>Random content</div>
        </Collapse>
        <input type="submit" value="作成する" className="pure-button pure-button-primary" />
      </form>
    );
  }
}