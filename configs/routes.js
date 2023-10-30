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

  "/api/doctor_service/": `${
    process.env.NODE_ENV == "production"
      ? process.env.DOCTOR_SERVICE_PROD
      : process.env.DOCTOR_SERVICE_DEV
  }/api/doctor/`,

  "/api/doctor_service/getDiseases": `${
    process.env.NODE_ENV == "production"
      ? process.env.DOCTOR_SERVICE_PROD
      : process.env.DOCTOR_SERVICE_DEV
  }/api/doctor/getDiseases`,

  "/api/doctor_service/createRateAndReview": `${
    process.env.NODE_ENV == "production"
      ? process.env.DOCTOR_SERVICE_PROD
      : process.env.DOCTOR_SERVICE_DEV
  }/api/doctor/crateRateAndReview`,

  "/api/doctor_service/getAllDoctors": `${
    process.env.NODE_ENV == "production"
      ? process.env.DOCTOR_SERVICE_PROD
      : process.env.DOCTOR_SERVICE_DEV
  }/api/doctor/getAllDoctors`,

  "/api/doctor_service/getDoctor": `${
    process.env.NODE_ENV == "production"
      ? process.env.DOCTOR_SERVICE_PROD
      : process.env.DOCTOR_SERVICE_DEV
  }/api/doctor/getDoctor`,

  "/api/doctor_service/updateDoctorDetails": `${
    process.env.NODE_ENV == "production"
      ? process.env.DOCTOR_SERVICE_PROD
      : process.env.DOCTOR_SERVICE_DEV
  }/api/doctor/updateDoctorDetails`,

  //chatbot service
  "/api/chatbot_service/": `${
    process.env.NODE_ENV == "production"
      ? process.env.CHATBOT_SERVICE_PROD
      : process.env.CHATBOT_SERVICE_DEV
  }/api/messages`,

  "/api/chatbot_service/predict": `${
    process.env.NODE_ENV == "production"
      ? process.env.CHATBOT_SERVICE_PROD
      : process.env.CHATBOT_SERVICE_DEV
  }/api/messages/predict`,

  // Add more routes and microservices as needed
};

module.exports = routes;
