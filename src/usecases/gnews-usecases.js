import { REDIS_DEFAULT_EXPIRY } from "../resources/constant.js";

/**
 * This useCases is used to find the g-news headlines
 * @param { string } page
 * @param { getTopHeadlines, redisService, base64Helper } dependencies
 * @returns
 */
export const findGNewsHeadLines = async (page, { getTopHeadlines, redisService, base64Helper }) => {
  let redisKey = "top-headlines-list." + base64Helper.jsonToBase64({ page });
  let redisData = await redisService.get(redisKey);
  if (redisData) return JSON.parse(redisData);

  let response = await getTopHeadlines(page);
  await redisService.set(redisKey, JSON.stringify(response), REDIS_DEFAULT_EXPIRY);
  return response;
};

/**
 * This useCases is used to search the g-news headlines
 * @param { string } page
 * @param { string } title
 * @param { string } keywords
 * @param { getTopHeadlines, redisService, base64Helper } dependencies
 * @returns
 */
export const searchGNewsHeadLines = async (page, title, keywords, { redisService, base64Helper }) => {
  let redisJson = {
    page,
  };
  if (title) redisJson = { ...redisJson, title };
  if (keywords) redisJson = { ...redisJson, keywords };
  // Check the data exist or not in the redis based on the search param
  let redisKey = "top-search-headlines-list." + base64Helper.jsonToBase64(redisJson);
  let redisData = await redisService.get(redisKey);
  if (redisData) return { status: true, data: JSON.parse(redisData) }; // return if exist

  //If not exist in the history, get the data from redis based on the page and filter it based on the search param
  let findGNewsHeadLinesUseCaseRedisKey = "top-headlines-list." + base64Helper.jsonToBase64({ page }); // This key
  let headlineList = await redisService.get(findGNewsHeadLinesUseCaseRedisKey);
  if (headlineList) headlineList = JSON.parse(headlineList);
  else return { status: false, message: "Please call the first api (/api/v1/emurgo/gnews/top-headlines) to get the data and then u can call this(/api/v1/emurgo/gnews/search) api. Because based on the first api response, I am searching here", data: [] }; // return empty, If the headline data does not exist

  let result = [];
  if (headlineList) {
    result = headlineList.articles;
    if (title) result = headlineList.articles.filter((headline) => headline.title.toLowerCase() == title.toLocaleLowerCase());
    if (keywords) result = headlineList.articles.filter((headline) => headline.title.toLowerCase().includes(keywords.toLowerCase()));
  }

  await redisService.set(redisKey, JSON.stringify(result), REDIS_DEFAULT_EXPIRY);
  return { status: true, data: result };
};
