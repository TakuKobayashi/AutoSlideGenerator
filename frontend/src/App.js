import React from 'react';
import GoogleLogin from 'react-google-login';
import logo from './AutoSlideGeneratorLogo.png';
import backgroundVideoMP4 from './Background.mp4';
import backgroundVideoWebm from './Background.webm';
import backgroundVideoJpg from './Background.jpg';
import './App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Card, Input, Accordion, AccordionSection, Select, Button, CheckboxToggle, Textarea } from 'react-rainbow-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      searchWebsiteType: 'google',
      exportType: 'googleSlide',
      pushEnable: false,
      loading: false,
      slideTitle: '',
      googleAccount: {},
      googleSlides: [],
    };

    this.responseGoogle = this.responseGoogle.bind(this);
    this.generateSlideSubmit = this.generateSlideSubmit.bind(this);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.onPushChecked = this.onPushChecked.bind(this);
  }

  generateSlideSubmit(event) {
    this.setState({ loading: true });
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
      googleAccessToken: this.state.googleAccount.accessToken || "ya29.Il-wBwIkv-wvXRN2y3HijdZGpIDtPocuugRG_WqBGUr1w-mc4MOEXZtbm7uRmMuIGkWNs-CkLO_ao6yQPsjmO3X2Wzm85lg5MUupGC88ezc5MroXT6E4F0r7laStU4l_mA",
      presentationProperty: {
        title: slideTitle,
      },
    });
    console.log(res);
    this.setState({
      loading: false,
      googleSlides: this.state.googleSlides.concat([res.data]),
    });
  }

  onPushChecked(event, checked) {
    console.log(event);
    console.log(checked);
    this.setState({ pushEnable: checked });
  }

  responseGoogle(response) {
    this.setState({
      googleAccount: {
        profileObj: response.profileObj,
        tokenObj: response.tokenObj,
        accessToken: response.accessToken,
        googleId: response.response,
        tokenId: response.tokenId,
      },
    });
    console.log(this.state);
  }

  render() {
    const slideLinks = []
    for(const slide of this.state.googleSlides){
      const url = "https://docs.google.com/presentation/d/" + slide.presentationId + "/edit"
      slideLinks.push(<li key={slide.presentationId}><a href={url}>{slide.title}</a></li>);
    }

    return (
      <div className="App">
        <video autoPlay loop muted poster={backgroundVideoJpg} id="bgvid">
          <source src={backgroundVideoWebm} type="video/webm" />
          <source src={backgroundVideoMP4} type="video/mp4" />
        </video>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          Google SlideでSlideを作成する場合はGoogleにLoginしてください:
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            buttonText="Login"
            responseType="id_token code"
            accessType="online"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </p>
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
        <ul>
          {slideLinks}
        </ul>
      </div>
    );
  }
}

export default App;
