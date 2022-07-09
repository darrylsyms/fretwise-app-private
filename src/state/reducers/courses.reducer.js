import { SAVE_COURSES } from '../actions/actionTypes';
import {Map} from "immutable";

const coursesReducer = reducer => (state = reducer(undefined, {}), action) => {

  switch (action.type) {

      case SAVE_COURSES:

      const newById = Map(action.payload)
      const newState = {
        ...state,
        byId: newById
      }

      return reducer(newState, action);

    default:
      return reducer(state, action);
  }

}

export default coursesReducer;