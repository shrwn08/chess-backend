const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./database/db");
const aiRoutes = require("./routes/ai.routes");
const gameRoutes = require("./routes/game.routes");
const userRoutes = require("./routes/user.routes");
const { initializeSocket } = require("./socket");

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

const PORT =  process.env.PORT || 3000 ;

//MongoDB Connection
dbConnection();

io.listen(server);

//webSocket Logic (for Real-time Chess)

initializeSocket(io);

app.use("/api", aiRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/user", userRoutes);

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
