import { SAVE_COURSE_INCLUDES } from './actionTypes';

export const saveCourseIncludes = (courseIncludes) => {
  return {
    type: SAVE_COURSE_INCLUDES,
    payload: courseIncludes,
  };
};