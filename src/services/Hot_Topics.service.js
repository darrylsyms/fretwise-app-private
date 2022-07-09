import { getApi } from "@src/services";

export const getHotTopics = async (config) => {

  try {
    const api = getApi(config);

    // Fetch the topics list I want to show, plus "image" key.
    const responseOne = await api.customRequest(
      "media/custom-restapi-endpoints/v1/hot_topics",
      "get",
      { is_new: true },
      null,
      {},
      false
    );

    const MySpecifiedTopicsIds = responseOne.data.map((item) => item.id);

    // Fetch the keys I specified in responseOne.
    const responseTwo = await api.customRequest(
      `wp-json/buddyboss/v1/topics?_embed=true&include=${MySpecifiedTopicsIds.toString()}`,
      "get",
      { is_new: true },
      null,
      {},
      false
    );

    // Merge the values from responseOne into responseTwo ("image" key)
    for (var i = 0; i < responseTwo.data.length; i++) {
      for (var j = 0; j < responseOne.data.length; j++) {
        if (responseTwo.data[i].id === responseOne.data[j].id) {
          responseTwo.data[i].image = responseOne.data[j].image;
          break;
        }
      }
    }

    const apiResponse = responseTwo.data;

    // Final result must be an object
    const ArrayToObject = {};
    for (let i = 0; i < apiResponse.length; i++) {
      ArrayToObject[apiResponse[i].id] = apiResponse[i];
    }

    return ArrayToObject;

  } catch (err) {
    // wouldn't be a bad idea to implement some kind of error handling solution
    // in the event the server is down or the user has a network error
    return { error: err };
  }
};