import React from 'react';
import purecss from 'purecss';

export default class GenerateSlideForm extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <form className="pure-form">
        <input type="text" name="q" />
        <input type="submit" value="作成する" className="pure-button pure-button-primary" />
      </form>
    );
  }
}