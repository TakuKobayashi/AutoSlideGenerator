import React from 'react';
import purecss from 'purecss';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import Push from 'push.js';

export default class GenerateSlideForm extends React.Component {
  constructor(props) {
    super(props);

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
        <div className="pure-u-1">
          <input type="text" name="q" placeholder="スライドにしたい画像のキーワードを,(カンマ区切り)で入力していってください" />
        </div>
        <h2>素材の収集元</h2>
        <Collapse isOpened={true || false}>
          <h2>素材の収集元</h2>
          <p><input type="radio" name="rd" id="rd1" /><label htmlFor="rd1">Google画像検索</label></p>
          <p><input type="radio" name="rd" id="rd2" /><label htmlFor="rd2">Twitter</label></p>
          <p><input type="radio" name="rd" id="rd3" /><label htmlFor="rd2">Flickr</label></p>
          <p><input type="radio" name="rd" id="rd4" /><label htmlFor="rd2">Instagram</label></p>
          <h2>プレゼンの出力先</h2>
          <p><input type="radio" name="rd" id="rd11" /><label htmlFor="rd1">Google Slide</label></p>
          <p><input type="radio" name="rd" id="rd12" /><label htmlFor="rd2">HTML</label></p>
          <h2>プッシュ通知</h2>
          <p><input type="checkbox" name="cb" id="cb1" /><label htmlFor="cb1">出来上がったらプッシュ通知でお知らせする</label></p>
        </Collapse>
        <input type="submit" value="作成する" className="pure-button pure-button-primary" />
      </form>
    );
  }
}
