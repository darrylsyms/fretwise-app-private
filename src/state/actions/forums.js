import { SAVE_FORUMS } from "./actionTypes";

export const saveForums = (forums) => {
  return {
    type: SAVE_FORUMS,
    payload: forums,
  };
};