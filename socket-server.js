const socketIO = require("socket.io");
const logger = require("./helpers/appLogger");
const AuthSocket = require("./middleware/authSocket");

function initializeSocketServer(server) {
  const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.CORS.split(", "),
      // credentials: true,
    },
  });



  io.on("connection", (socket) => {
    logger.info(`New Socket Connnected ${socket.handshake.address}`);

    socket.on("setup", async (data) => {
       const authToken = await data.headers.authorization; // Get the authorization token from the heade

      if (!authToken) {
        // Handle the case where the token is missing
        socket.emit("error_message", "Authorization token missing");
        return;
      }

      const isAuth = await AuthSocket(authToken);

      if (!isAuth) {
        socket.emit("error", "Ayur Mind Gateway Socket Auth Failed");
        return;
      }
      socket.join(data.user._id);
     logger.info(
        "Ayur Mind Gateway Socket Connected " +
          socket.handshake.address +
          " user id " +
          data.user._id
      );
      socket.emit("connected",
        "Ayur Mind Gateway Socket Connected " +
          socket.handshake.address +
          " user id " +
          data.user._id
      );
      logger.info(`Setup Completed ${socket.handshake.address}`);
    });

    // Emit the "callService" event to the server on port 5008
    const chatServiceSocketServer = require("socket.io-client")(
      process.env.NODE_ENV == "production"
        ? process.env.CHAT_SERVICE_PROD
        : process.env.CHAT_SERVICE_DEV
    );

    socket.on("chat_service", (data) => {
      if (data && data.user) {
        switch (data.emit_message) {
          case "chat_setup": {
            const emitData = {
              _id: data.user._id,
            };
            chatServiceSocketServer.emit("setup", emitData);
            logger.info(`Chat Setup Completed`);
            break;
          }
          case "join_chat": {
            if (data.selectedChatId) {
              const emitData = data.selectedChatId;
              chatServiceSocketServer.emit("join chat", emitData);
              logger.info(`join Chat Completed`);
            }
            break;
          }
          case "typing": {
            if (data.selectedChatId) {
              const emitData = data.selectedChatId;
              chatServiceSocketServer.emit("typing", emitData);
            }
            break;
          }
          case "stop_typing": {
            if (data.selectedChatId) {
              const emitData = data.selectedChatId;
              chatServiceSocketServer.emit("stop typing", emitData);
            }
            break;
          }
          case "new_message": {
            if (data.chat) {
              const emitData = data.chat;
              chatServiceSocketServer.emit("new message", emitData);
              logger.info(`new message`);
            }
            break;
          }
        }
      } else {
        socket.emit("error", "user data not diffined");
        socket.disconnect();
      }
    });

      chatServiceSocketServer.on("connected", (data) => {
        socket.emit("chat_connected", data);
        console.log("chat_connected", data);
      });

      chatServiceSocketServer.on("message_recieved", (newMessageRecieved) => {
       var chat = newMessageRecieved.chat;

       if (chat && !chat.users) return console.log("chat.users not defined");

       chat.users.forEach((user) => {
         console.log("🚀 ~ file: socket-server.js:121 ~ chat.users.forEach ~ user:", user)
         if (user._id == newMessageRecieved.sender._id) {
           socket.emit("message_recieved", newMessageRecieved);
           console.log("🚀 ~ message_recieved", user._id);
         }
       });
      });

    socket.on("notification_service", (data) => {
      if (data && data.user) {
      } else {
        socket.emit("error", "user data not diffined");
        socket.disconnect();
      }
    });

    socket.on("disconnect", () => {
      socket.emit("socket_disconnect", "disconnect");
      logger.warn(`Gateway Socket Disconnected ` + socket.handshake.address);
    });
  });




  return io;
}

module.exports = initializeSocketServer;
