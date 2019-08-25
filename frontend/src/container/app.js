import React from 'react';
import { connect } from 'react-redux';

import App from '../App';
import actions from '../action/app';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    googleLogin: (googleAccountObj) => {
      dispatch(actions.googleLogin(googleAccountObj));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
