import express from "express";
import gNewsRoutes from "./gnews-route.js";


const route = express();

/**
 * Load all course related API's
 */
route.use("/gnews", gNewsRoutes);

export default route;
