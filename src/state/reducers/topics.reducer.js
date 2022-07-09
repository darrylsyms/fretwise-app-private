import { SAVE_TOPICS } from '../actions/actionTypes';
import {Map} from "immutable";

const topicsReducer = reducer => (state = reducer(undefined, {}), action) => {

  switch (action.type) {

      case SAVE_TOPICS:

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

export default topicsReducer;