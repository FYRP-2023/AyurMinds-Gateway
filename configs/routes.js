const routes = {
  // Define the routes and their corresponding microservice URLs
  //authentication_service
  "/api/authentication_service/signin": `${
    process.env.NODE_ENV == "production"
      ? process.env.AUTHENTICATIOIN_SERVICE_PROD
      : process.env.AUTHENTICATIOIN_SERVICE_DEV
  }/api/user/signin`,
  "/api/authentication_service/": `${
    process.env.NODE_ENV == "production"
      ? process.env.AUTHENTICATIOIN_SERVICE_PROD
      : process.env.AUTHENTICATIOIN_SERVICE_DEV
  }/api/user/`,
  "/api/authentication_service/access": `${
    process.env.NODE_ENV == "production"
      ? process.env.AUTHENTICATIOIN_SERVICE_PROD
      : process.env.AUTHENTICATIOIN_SERVICE_DEV
  }/api/user/access`,
  "/api/authentication_service/signout": `${
    process.env.NODE_ENV == "production"
      ? process.env.AUTHENTICATIOIN_SERVICE_PROD
      : process.env.AUTHENTICATIOIN_SERVICE_DEV
  }/api/user/signout`,

  //   authorization_service
  "/api/authorization_service/getUser": `${
    process.env.NODE_ENV == "production"
      ? process.env.AUTHORIZATION_SERVICE_PROD
      : process.env.AUTHORIZATION_SERVICE_DEV
  }/api/auth/getUser`,
  "/api/authorization_service/info": `${
    process.env.NODE_ENV == "production"
      ? process.env.AUTHORIZATION_SERVICE_PROD
      : process.env.AUTHORIZATION_SERVICE_DEV
  }/api/auth/`,

  //doctor_reccomandation_service
  "/api/doctor_reccomandation_service/": `${
    process.env.NODE_ENV == "production"
      ? process.env.DOC_RECMMONDATION_SERVICE_PROD
      : process.env.DOC_RECMMONDATION_SERVICE_DEV
  }/api/doc/`,

  //chat__service
  "/api/chat_service/": `${
    process.env.NODE_ENV == "production"
      ? process.env.CHAT_SERVICE_PROD
      : process.env.CHAT_SERVICE_DEV
  }/api/chat/`,
  
  "/api/chat_service/fetchChats": `${
    process.env.NODE_ENV == "production"
      ? process.env.CHAT_SERVICE_PROD
      : process.env.CHAT_SERVICE_DEV
  }/api/chat/fetchChats`,

  "/api/message_service/": `${
    process.env.NODE_ENV == "production"
      ? process.env.CHAT_SERVICE_PROD
      : process.env.CHAT_SERVICE_DEV
  }/api/message/`,

  // Add more routes and microservices as needed
};

module.exports = routes;
