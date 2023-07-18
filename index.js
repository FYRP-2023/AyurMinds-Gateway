require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./helpers/appLogger");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || process.env.DEV_PORT;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());

// Set trust proxy for secure cookies
app.set("trust proxy", 1);

// Routes
app.get("/", (req, res) => {
  res.send("Ayur Minds Gateway");
});

const routes = require("./configs/routes");

// Middleware to handle authorization
const authGateWay = require("./middleware/authGateway")
app.use(authGateWay);

// Middleware to forward the requests to the appropriate microservice
app.use((req, res) => {
  const { path, method, body, query } = req;
  const microserviceUrl = routes[path];

  if (!microserviceUrl) {
    return res.status(404).send("Microservice not found.");
  }

  try {
    const headers = {
      Authorization: req.headers.authorization,
      Cookie: req.headers.cookie, // Pass the cookies from the request
    };

    // Create an axios instance with the headers
    const axiosInstance = axios.create({
      headers,
    });

    // Forward the request to the microservice
    axiosInstance({
      method,
      url: `${microserviceUrl}`,
      data: body,
      params: query,
      headers,
    })
      .then((response) => {
        // Extract the cookies from the response
        const receivedCookies = response.headers["set-cookie"];
        if (receivedCookies) {
          res.set("Set-Cookie", receivedCookies);
        }
        res.status(response.status).json(response.data);
      })
      .catch((error) => {
        if (error.response) {
          res.status(error.response.status).json(error.response.data);
        } else {
          res.status(500).send("Internal Server Error.");
        }
      });
  } catch (error) {
    res.status(500).send("Internal Server Error.");
  }
});

// HTTP request logger
app.listen(PORT, () => {
  logger.info(`Server is starting at ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Promise Rejection: ${err}`);
});
