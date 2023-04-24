import { SAVE_COURSES } from "./actionTypes";

export const saveCourses = (courses) => {
  return {
    type: SAVE_COURSES,
    payload: courses,
  };
};