import React from 'react';
import purecss from 'purecss';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import Push from 'push.js';

export default class GenerateSlideForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.generateSlideSubmit = this.generateSlideSubmit.bind(this);
  }

  generateSlideSubmit(event) {
    if (!Push.Permission.has()) {
      const self = this;
      Push.Permission.request(
        () => {
          self.generateSlideRequest();
        },
        () => {
          self.generateSlideRequest();
        },
      );
    } else {
      this.generateSlideRequest();
    }
    event.preventDefault();
  }

  async generateSlideRequest() {
    console.log(process.env.REACT_APP_API_ROOT_URL);
    const res = await axios.post(process.env.REACT_APP_API_ROOT_URL + '/slide/generate');
    console.log(res);
  }

  render() {
    const googleAccount = this.props.googleAccount;
    return (
      <form onSubmit={this.generateSlideSubmit} className="pure-form">
        <div>{JSON.stringify(googleAccount)}</div>
        <input type="text" name="q" />
        <Collapse isOpened={true || false}>
          <div>Random content</div>
        </Collapse>
        <input type="submit" value="作成する" className="pure-button pure-button-primary" />
      </form>
    );
  }
}
