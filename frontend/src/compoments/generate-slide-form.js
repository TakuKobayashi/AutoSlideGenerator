import React from 'react';
import purecss from 'purecss';
import axios from 'axios';
import {Collapse} from 'react-collapse';

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