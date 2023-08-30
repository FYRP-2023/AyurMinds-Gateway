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
            break;
          }
          case "join_chat": {
            if (data.selectedChatId) {
              const emitData = data.selectedChatId;
              chatServiceSocketServer.emit("join chat", emitData);
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
      });

      chatServiceSocketServer.on("message recieved", (newMessageRecieved) => {
        console.log(
          "🚀 ~ file: socket-server.js:79 ~ chatServiceSocketServer.on ~ newMessageRecieved:",
          newMessageRecieved
        );
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
