const Game  = require("../models/game.models");

const getGameById = async (req, res) => {
    try {
        const {gameId} = req.params;
        const game = await Game.findById(gameId).populate("whitePlayer blackPlayer");


        if(!game){
            return res.status(404).json({message : "Game not found"});
        }

        res.json(game);
    } catch (error) {
        res.status(500).json({error : "Error fetching game"})
    }
};


const createGame = async (req, res)=> {
    try {
        const {whitePlayer, blackPlayer} = req.body;

        const newGame = await Game.create({whitePlayer, blackPlayer});
    } catch (error) {
        res.staus(500).json({error : "Error creating game"})
    }
};


const updateGameMoves = async (req, res) => {
    try {
        const {gameId} = req.params;
        const {move} = req.body;

        const game = await Game.findByIdAndUpdate(gameId, {$push: {moves : move}}, {new : true});

        if(!game) {
             return res.status(404).json({message : "Game not found"});
        }

        res.json(game);
    } catch (error) {
        res.status(500).json({error : "Error updating game moves"})
    }
};


const updateGameResult = async (req, res) => {
    try {
        const {gameId} = req.params;
        const {result} = req.body;

        const game = await Game.findByIdAndUpdate(gameId, {result}, {new : true});

        if(!game){
            return res.status(404).json({message : "Game not found"})
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({error : "Error updating game result"})
    }
}

module.exports = {getGameById, createGame, updateGameMoves, updateGameResult};