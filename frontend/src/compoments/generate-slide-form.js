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
      q: '',
      searchWebsiteType: 'google',
      exportType: 'googleSlide',
      pushEnable: false,
    };
    this.loading = false

    this.generateSlideSubmit = this.generateSlideSubmit.bind(this);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.onPushChecked = this.onPushChecked.bind(this);
  }

  generateSlideSubmit(event) {
    console.log(this.loading)
    this.loading = true;
    setTimeout(() => {
      console.log(this.loading)
      this.loading = false
    }, 1000);
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
    event.preventDefault();
  }

  onSelectChanged(event) {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  }

  async generateSlideRequest() {
    console.log(this.state);
    const res = await axios.post('https://ufnk35q9zh.execute-api.ap-northeast-1.amazonaws.com/dev/hello', this.state);

    console.log(res);
  }

  onPushChecked(event, checked) {
    console.log(event);
    console.log(checked);
    this.setState({ pushEnable: event.target.checked });
  }

  render() {
    const googleAccount = this.props.googleAccount;
    return (
      <FormControl>
        <TextField
          label="slide titles"
          placeholder="スライドにしたい画像のキーワードを,(カンマ区切り)で入力していってください"
          fullWidth={true}
          onChange={(e) => this.setState({ q: e.target.value })}
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
          <Select onChange={this.onSelectChanged} name="exportType" value={this.state.exportType}>
            <MenuItem value="googleSlide">Google Slide</MenuItem>
            <MenuItem value="html">HTML</MenuItem>
          </Select>
          <FormControlLabel
            control={<Checkbox checked={this.state.pushEnable} onChange={this.onPushChecked} />}
            label="出来上がったらプッシュ通知でお知らせする"
          />
        </Collapse>
        {(() => {
          if (this.loading) {
            return <CircularProgress />
          } else {
            return <Button variant="contained" size="large" fullWidth={true} color="primary" onClick={this.generateSlideSubmit}>作成する</Button>
          }
        })()}
      </FormControl>
    );
  }
}
