import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

const SERVICE_BASE_URL = "/api/v1/emurgo";

/**
 * Load all routes
 */
app.use(SERVICE_BASE_URL, routes);

/**
 * Route to handle the default
 */
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Server is running",
  });
});

/**
 * Listen on the application port
 */
app.listen(process.env.APP_PORT, (err) => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
