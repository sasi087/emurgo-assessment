// Import all the useCases
import { findGNewsHeadLines, searchGNewsHeadLines } from "../usecases/gnews-usecases.js";
// Import all the services
import gNewsService from "../services/gNews-service.js";
import redisService from "../services/redis-service.js";
//Import all the helpers
import base64Helper from "../helpers/base64-helper.js";

/**
 * @description Controller which is used to get the top g-news headlines
 * @param {*} req
 * @param {*} res
 */
const findGNewsHeadlinesController = async (req, res) => {
  try {
    const { page } = req.query;

    const response = await findGNewsHeadLines(page, { getTopHeadlines: gNewsService.getTopHeadlines, redisService, base64Helper });
    res.status(200).json({ status: true, message: "Successfully fetched the top headlines", data: response });
  } catch (ex) {
    console.log("findGNewsHeadlinesController: ", ex);
    res.status(ex?.statusCode || 500).json({
      message: ex?.message || "server error, Please try again",
    });
  }
};

/**
 * @description Controller which is used to search the top g-news headlines based on the first api response
 * @param {*} req
 * @param {*} res
 */
const searchGNewsHeadlinesController = async (req, res) => {
  try {
    const { page, title, keywords } = req.query;

    const response = await searchGNewsHeadLines(page, title, keywords, { redisService, base64Helper });
    res.status(200).json({ status: response.status, message: response.status ? "Successfully searched the top headlines" : response.message, data: response.data });
  } catch (ex) {
    console.log("searchGNewsHeadlinesController: ", ex);
    res.status(ex?.statusCode || 500).json({
      message: ex?.message || "server error, Please try again",
    });
  }
};

export { findGNewsHeadlinesController, searchGNewsHeadlinesController };
