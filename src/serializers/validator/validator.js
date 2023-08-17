import { validationResult } from "express-validator";
import NumberHelper from "../../helpers/number-helper.js";

/**
 * Function which is used to validate for any error
 * @returns
 */
const errorValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Function / middleware to parse page
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const parsePagination = (req, res, next) => {
  let { page } = req.query;
  if (page && page != "") {
    if (!!parseInt(page)) req.query.page = parseInt(page);
    else return res.status(404).json({ message: "Page query param value should be number" });
  } else req.query.page = 1;
  next();
};

export default errorValidator;
