import { SAVE_TOPICS } from "./actionTypes";

export const saveTopics = (topics) => {
  return {
    type: SAVE_TOPICS,
    payload: topics,
  };
};