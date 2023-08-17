import { body, param, query } from "express-validator";
import errorValidator, { parsePagination } from "./validator.js";

/**
 * To validate type and parse skip and limit
 */
export const listTopHeadlines = [parsePagination];

export const searchTopHeadlines = [
  query("title").optional().isString().withMessage("Title value should be string!").trim().isLength({ min: 1 }).withMessage("Title is empty!"),
  query("keywords").optional().isString().withMessage("keywords value should be string!").trim().isLength({ min: 1 }).withMessage("keywords is empty!"),
  errorValidator,
  parsePagination
];
