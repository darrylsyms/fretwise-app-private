import { SAVE_WELCOME_MESSAGES } from '../actions/actionTypes';
import {Map} from "immutable";

const initialState = {
  byId: null,
};

const welcomeMessagesReducer = (state = initialState, action) => {

  switch (action.type) {

      case SAVE_WELCOME_MESSAGES: {

      const newById = Map(action.payload)
      return {
        ...state,
        byId: newById
      };

    }
    default:
      return state;
  }

}

export default welcomeMessagesReducer;