const { spawn } = require("child_process");
const path = require("path");
const User = require("../models/user.models")


// const handleStockfishMove = (req, res) => {
    
    
//     const enginePath = path.join(__dirname, "../bin/stockfish"); // Path to binary
//     const engine = spawn(enginePath);;
  
//     engine.postMessage("uci\n");
//     engine.postMessage(`position fen ${fen}\n`);
//     engine.postMessage("go depth 15\n");
  
//     // engine.onmessage = (event) => {
//     //   if (event && event.includes("bestmove")) {
//     //     const move = event.split(" ")[1];
//     //     res.json({ bestMove: move });
//     //   }
//     // };

//     engine.stdin.on("data", data=>{
//         const output = data.toString();

//         if(output.includes(bestmove)){
//             const move = output.slpit("bestmove")[1].split(" ")[0];
//             res.json({bestmove : move});
//             engine.kill();
//         }
//     })

//     engine.stderr.on("data", data=>{
//         console.error(`Stockfish Error: ${data}`);
//     })

//     engine.on("exit", code=>{
//         console.log(`Stockfish exited with code ${code}`);
//     })
//   };

const handleStockfishMove = () =>{
    const { fen } = req.body;

    const enginePath = path.join(__dirname, "../bin/stockfish");

    const engine = spawn(enginePath);

    engine.stdin.write("uci\n");
    engine.stdin.write(`position fen ${fen}\n`);
    engine.stdin.write("go depth 15\n");


    engine.stdout.on("data", (data) => {
        const output = data.toString();
        console.log("Stockfish Output:", output);

        if (output.includes("bestmove")) {
            const move = output.split("bestmove ")[1].split(" ")[0];
            res.json({ bestMove: move });
            engine.kill();
        }
    });


    engine.stderr.on("data", (data) => {
        console.error(`Stockfish Error: ${data}`);
    });

    engine.on("exit", (code) => {
        console.log(`Stockfish exited with code ${code}`);
    });
}

  const saveGame = async (req, res) => {
    try {
        const { userId, fen } = req.body;
        await User.findByIdAndUpdate(userId, { saveGame: fen });
        res.json({ message: "Game saved successfully" });
    } catch (error) {
        res.status(500).json({error : "Error saving game"})
    }
  };

  const resumeGame = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId); // Find user by ID
        res.json({ fen: user.savedGame }); // Return saved game FEN string
    } catch (error) {
        res.status(500).json({error : "Error resuming game"});
    }
};


  module.exports = {handleStockfishMove, saveGame, resumeGame}