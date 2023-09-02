const { default: axios } = require("axios");
const logger = require("../helpers/appLogger");

const AuthSocket = async (authToken) => {
  let result = false
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
    .then((results) => {
      result = results.status == 200;
    })
    .catch((err) => {
      logger.warn(...err.response.data);
      result = false;
    });
    return result;
};

module.exports = AuthSocket;