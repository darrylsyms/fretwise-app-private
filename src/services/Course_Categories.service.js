import { getApi } from "@src/services";

export const getCourseCategories = async (config) => {
  try {
    const api = getApi(config);
    const response = await api.customRequest(
      "wp-json/buddyboss-app/learndash/v1/course-categories",
      "get",
      { is_new: true },
      null,
      {},
      false
    );

    const apiResponse = response.data;
    const ArrayToObject = {};
    for (let i = 0; i < apiResponse.length; i++) {
      if (apiResponse[i].count > 0) {
      ArrayToObject[apiResponse[i].id] = apiResponse[i];
      }
    }

    return ArrayToObject;

  } catch (err) {
    // wouldn't be a bad idea to implement some kind of error handling solution
    // in the event the server is down or the user has a network error
    return { error: err };
  }
};