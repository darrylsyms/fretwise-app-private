import { SAVE_COURSE_CATEGORIES } from '../actions/actionTypes';

import {Map} from "immutable";
const courseCategoriesReducer = reducer => (state = reducer(undefined, {}), action) => {

  switch (action.type) {

      case SAVE_COURSE_CATEGORIES:

      const newById = Map(action.payload)
      const newState = {
        ...state,
        cache: newById
      }

      return reducer(newState, action);

    default:
      return reducer(state, action);
  }

}

export default courseCategoriesReducer;