import React from 'react';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Push from 'push.js';

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
    const slideWords = this.state.words.join(",").split(",")
    if(slideWords.length <= 0){
      return;
    }
    let slideTitle = this.state.slideTitle;
    if(!slideTitle){
      slideTitle = slideWords[0];
    }
    const res = await axios.post(process.env.REACT_APP_API_ROOT_URL + "/slide/generate", {
      words: slideWords.join(","),
      searchWebsiteType: this.state.searchWebsiteType,
      exportType: this.state.exportType,
      pushEnable: this.state.pushEnable,
      googleAccessToken: this.state.googleAccount.accessToken,
      presentationProperty: {
        title: slideTitle,
      }
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
      <FormControl>
        <TextField
          label="image search words"
          placeholder="スライドにしたい画像のキーワードを,(カンマ区切り)で入力していってください"
          fullWidth={true}
          onChange={(e) => this.setState({ words: [e.target.value] })}
        />
        <Collapse isOpened={true || false}>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select onChange={this.onSelectChanged} autoWidth={true} name="searchWebsiteType" value={this.state.searchWebsiteType}>
            <MenuItem value="google">Google画像検索</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="flickr">Flickr</MenuItem>
            <MenuItem value="instagram">Instagram</MenuItem>
          </Select>
          <FormHelperText>Label + placeholder</FormHelperText>
          <TextField
            label="slide title"
            placeholder="スライド名を決めたい場合は入力してください"
            fullWidth={true}
            onChange={(e) => this.setState({ slideTitle: e.target.value })}
          />
          <Select onChange={this.onSelectChanged} name="exportType" value={this.state.exportType}>
            <MenuItem value="googleSlide">Google Slide</MenuItem>
            <MenuItem value="html">HTML</MenuItem>
          </Select>
          <FormControlLabel
            control={<Checkbox checked={this.state.pushEnable} onChange={this.onPushChecked} />}
            label="出来上がったらプッシュ通知でお知らせする"
          />
        </Collapse>
        <Button variant="contained" size="large" fullWidth={true} color="primary" onClick={this.generateSlideSubmit} disabled={this.state.loading}>
          {this.state.loading ? <CircularProgress /> : '作成する'}
        </Button>
      </FormControl>
    );
  }
}
