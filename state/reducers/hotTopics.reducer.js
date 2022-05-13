import { SAVE_HOT_TOPICS } from '../actions/actionTypes';
import {Map} from "immutable";

const initialState = {
  byId: null,
};

const hotTopicsReducer = (state = initialState, action) => {

  switch (action.type) {

      case SAVE_HOT_TOPICS: {

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

export default hotTopicsReducer;