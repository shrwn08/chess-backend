const express = require('express');
const {handleStockfishMove, saveGame, resumeGame} = require('../controllers/ai.controllers')

const router = express.Router();

router.post("/ai-move",handleStockfishMove)
router.post('/save-game', saveGame);
router.get("/resume-game/:userId", resumeGame);




module.exports = router;