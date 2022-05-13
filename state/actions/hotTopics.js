import { SAVE_HOT_TOPICS } from './actionTypes';

export const saveHotTopics = (hotTopics) => {
  return {
    type: SAVE_HOT_TOPICS,
    payload: hotTopics,
  };
};