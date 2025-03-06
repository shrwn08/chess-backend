const Game = require("./models/game.models");

const rooms = {};

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`user Connected: ${socket.id}`);

    socket.on("findGame", async ({ userId }) => {
      let room = Object.keys(rooms).find((r) => rooms[r].length === 1);

      if (!room) {
        room = socket.id;
        rooms[room] = [];
      }

      rooms[room].push(socket.id);
      socket.join(room);

      if (rooms[room].length === 2) {
        const [whitePlayer, blackPlayer] = rooms[room];
        const newGame = await Game.create({ whitePlayer, blackPlayer });
        io.to(room).emit("gameStart", { room, gameId: newGame._id });
      }
    });

    socket.on("move", async ({ move, room, gameId }) => {
      socket.to(room).emit("move", move);
      await Game.findByIdAndUpdate(gameId, { $push: { moves: move } });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      for (const room in rooms) {
        rooms[room] = rooms[room].filter((id) => id !== socket.id);
        if (rooms[room].length === 0) delete rooms[room];
      }
    });
  });
};

module.exports = { initializeSocket };
