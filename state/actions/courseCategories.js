import { SAVE_COURSE_CATEGORIES } from "./actionTypes";

export const saveCourseCategories = (courseCategories) => {
  return {
    type: SAVE_COURSE_CATEGORIES,
    payload: courseCategories,
  };
};