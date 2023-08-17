import restAPIService from "./restAPI-service.js";
import { REQUEST_METHODS } from "../resources/constant.js";

const baseURL = "https://gnews.io/api/v4";

const G_NEWS_API_KEY = process.env.G_NEWS_API_KEY;

const getTopHeadlines = async (page) => {
  const data = await restAPIService.getDataFromRestAPI(`${baseURL}/top-headlines?apikey=${G_NEWS_API_KEY}&lang=en&page=${page}`, REQUEST_METHODS.GET, null);
  return data;
};

const gNewsService = {
  getTopHeadlines,
};

export default gNewsService;
