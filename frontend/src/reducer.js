const initialState = {
  googleAccount: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GoogleAccount': {
      return { googleAccount: state.googleAccount };
    }
    default:
      return state;
  }
}
