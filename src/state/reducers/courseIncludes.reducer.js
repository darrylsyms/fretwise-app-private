import { SAVE_COURSE_INCLUDES } from '../actions/actionTypes';
import {Map} from "immutable";

const initialState = {
  byId: null,
};

const courseIncludesReducer = (state = initialState, action) => {

  switch (action.type) {

      case SAVE_COURSE_INCLUDES: {

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

export default courseIncludesReducer;