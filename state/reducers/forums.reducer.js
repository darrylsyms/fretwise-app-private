import { SAVE_FORUMS } from '../actions/actionTypes';
import {Map} from "immutable";

const forumsReducer = reducer => (state = reducer(undefined, {}), action) => {

  switch (action.type) {

      case SAVE_FORUMS:

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

export default forumsReducer;