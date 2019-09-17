import React from 'react';
import axios from 'axios';
import Push from 'push.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import { Card, Input, Accordion, AccordionSection, Select, Button, CheckboxToggle, Textarea } from 'react-rainbow-components';

export default class GenerateSlideForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      searchWebsiteType: 'google',
      exportType: 'googleSlide',
      pushEnable: false,
      loading: false,
      slideTitle: '',
      googleAccount: this.props.googleAccount || {},
    };
    console.log(this.state);

    this.generateSlideSubmit = this.generateSlideSubmit.bind(this);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.onPushChecked = this.onPushChecked.bind(this);
  }

  generateSlideSubmit(event) {
    this.setState({ loading: true });
    /*
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
    */
    this.generateSlideRequest();
    event.preventDefault();
  }

  onSelectChanged(event) {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  }

  async generateSlideRequest() {
    console.log(this.state);
    const slideWords = this.state.words.join(',').split(',');
    if (slideWords.length <= 0) {
      return;
    }
    let slideTitle = this.state.slideTitle;
    if (!slideTitle) {
      slideTitle = slideWords[0];
    }
    const res = await axios.post(process.env.REACT_APP_API_ROOT_URL + '/slide/generate', {
      words: slideWords.join(','),
      searchWebsiteType: this.state.searchWebsiteType,
      exportType: this.state.exportType,
      pushEnable: this.state.pushEnable,
      googleAccessToken: this.state.googleAccount.accessToken,
      presentationProperty: {
        title: slideTitle,
      },
    });
    this.setState({ loading: false });
    console.log(res);
  }

  onPushChecked(event, checked) {
    console.log(event);
    console.log(checked);
    this.setState({ pushEnable: checked });
  }

  render() {
    return (
      <div className="rainbow-p-vertical_large rainbow-p-horizontal_xx-large rainbow-m-horizontal_xx-large">
        <Card>
          <Textarea
            placeholder="スライドにしたい画像のキーワードを,(カンマ区切り)で入力していってください"
            onChange={(e) => this.setState({ words: [e.target.value] })}
            rows={2}
          />

          <Accordion>
            <AccordionSection icon={<FontAwesomeIcon icon={faCog} className="rainbow-color_brand" />} label="詳細設定">
              <Select
                label="素材の収集元"
                options={[
                  { value: 'google', label: 'Google画像検索' },
                  { value: 'twitter', label: 'Twitter' },
                  { value: 'flickr', label: 'Flickr' },
                  { value: 'instagram', label: 'Instagram' },
                ]}
                onChange={this.onSelectChanged}
              />
              <Input
                label="slide title"
                placeholder="スライド名を決めたい場合は入力してください"
                onChange={(e) => this.setState({ slideTitle: e.target.value })}
                type="text"
              />
              <Select
                label="Slideの出力先"
                options={[{ value: 'googleSlide', label: 'Google Slide' }, { value: 'html', label: 'HTML' }]}
                name="exportType"
                value={this.state.exportType}
                onChange={this.onSelectChanged}
              />
              <CheckboxToggle
                label="出来上がったらプッシュ通知でお知らせする"
                value={this.state.pushEnable}
                onChange={this.onPushChecked}
              />
            </AccordionSection>
          </Accordion>
          <Button label="作成する" onClick={this.generateSlideSubmit} variant="brand" isLoading={this.state.loading} />
        </Card>
      </div>
    );
  }
}
