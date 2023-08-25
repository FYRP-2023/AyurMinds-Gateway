const { default: axios } = require("axios");

const AuthSocket = async ({ authToken }) => {
  await axios
    .post(
      `${
        process.env.NODE_ENV == "production"
          ? process.env.AUTHORIZATION_SERVICE_PROD
          : process.env.AUTHORIZATION_SERVICE_DEV
      }/api/auth/isAuth`,
      null,
      {
        headers: { Authorization: authToken },
      }
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      logger.warn(err.response.data);
      return res.status(403).send("service access permission denieded");
    });
};

module.exports = AuthSocket;