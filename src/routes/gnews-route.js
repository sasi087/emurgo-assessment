import express from "express";
import * as gNewsController from "../controller/gnews-controller.js";
import { listTopHeadlines, searchTopHeadlines } from "../serializers/validator/gNews-controller-validator.js";

const route = express();

/**
 * This route is used to find the g-news top headlines
 * Route: /api/v1/emurgo/gnews/articles
 * Query: {}
 * Return: [{json}]
 */
route.get("/articles", listTopHeadlines, gNewsController.findGNewsHeadlinesController);

/**
 * This route is used to search the g-news top headlines
 * Route: /api/v1/emurgo/gnews/search
 * Query: {}
 * Return: [{json}]
 */
route.get("/search", searchTopHeadlines, gNewsController.searchGNewsHeadlinesController);

export default route;
