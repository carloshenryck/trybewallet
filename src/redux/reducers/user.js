import { SAVE_INFORMATIONS } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_INFORMATIONS:
    return {
      ...state,
      email: action.info.email,
    };
  default:
    return state;
  }
};

export default userReducer;
