

const express = require('express');
const {getGameById, createGame, updateGameMoves, updateGameResult} = require("../controllers/game.controllers");

const router = express.Router();

router.get("/:gameId", getGameById);
router.post("/", createGame);
router.put("/:gameId/move", updateGameMoves);
router.put("/:gameId/result", updateGameResult);




module.exports = router;