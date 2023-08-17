import axios from "axios";

/**
 * Function which is used to send request to External API
 * @param {*} url
 * @param {*} method
 * @param {*} data
 * @returns
 */
const axiosService = async (url, method, data) => {
  const request = {
    url: url,
    method: method,
    data: data,
  };
  console.log(url);
  let response = await axios(request);
  return response.data;
};

/**
 * This function is used to call the axios service method to get the data
 * @param {*} url
 * @param {*} method
 * @param {*} data
 * @returns
 */
const getDataFromRestAPI = async (url, method, data) => {
  const result = await axiosService(url, method, data);
  return result;
};

const restAPIService = {
  getDataFromRestAPI,
};

export default restAPIService;
