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
      const authToken = await socket.handshake.headers.authorization; // Get the authorization token from the header

      if (!authToken) {
        // Handle the case where the token is missing
        socket.emit("error", "Authorization token missing");
        return;
      }

      const isAuth = await AuthSocket({ authToken });

      if (!isAuth) {
        socket.emit("Ayur Mind Gateway Socket Auth Failed");
        return;
      }
      socket.join(data.user._id);
      socket.emit(
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
        }
      } else {
        socket.emit("error", "user data not diffined");
        socket.disconnect();
      }
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
      logger.warn(`Gateway Socket Disconnected ` + socket.handshake.address);
    });
  });




  return io;
}

module.exports = initializeSocketServer;
