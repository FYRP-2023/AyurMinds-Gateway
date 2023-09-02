const { default: axios } = require("axios");
const logger = require("../helpers/appLogger");

const authGateway = async (req, res, next) => {
  const { path, headers } = req;

  // check user permission to access the services
  if (path.startsWith("/api/authorization_service")) {
    await axios
      .post(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.AUTHORIZATION_SERVICE_PROD
            : process.env.AUTHORIZATION_SERVICE_DEV
        }/api/auth/isAuth`,
        null,
        {
          headers: { ...headers },
        }
      )
      .then((result) => {})
      .catch((err) => {
        logger.warn(err.response.data);
        return res.status(403).send("service access permission denieded");
      });
  }
   

  next();
};

module.exports = authGateway;
