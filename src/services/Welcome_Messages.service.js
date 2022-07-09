import { getApi } from "@src/services";

export const getWelcomeMessages = async (config) => {

  try {
    const api = getApi(config);

    const response = await api.customRequest(
      "media/custom-restapi-endpoints/v1/welcome_messages",
      "get",
      { is_new: true },
      null,
      {},
      false
    );

    const apiResponse = response.data;

    // Final result must be an object
    const ArrayToObject = {};
    for (let i = 0; i < apiResponse.length; i++) {
      ArrayToObject[apiResponse[i].hour] = apiResponse[i];
    }

    return ArrayToObject;

  } catch (err) {
    // wouldn't be a bad idea to implement some kind of error handling solution
    // in the event the server is down or the user has a network error
    return { error: err };
  }
};