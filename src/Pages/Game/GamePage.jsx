import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameEngine from "./GameEngine";
import SignalRService from "../../Tools/SignalR";

function GamePage() {
  const location = useLocation();
  const { gameCode, playerRole, isRanked, opponentRating } =
    location.state || {};
  const [orientation, setOrientation] = useState(
    playerRole === "creator" ? "white" : "black",
  );
  const [gameEngine] = useState(new GameEngine());

  const [board, setBoard] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("white");
  const [gameStatus, setGameStatus] = useState("active");
  const [gameStart, setGameStart] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [kingInCheckPosition, setKingInCheckPosition] = useState(null);
  const [pendingPromotion, setPendingPromotion] = useState(null);
  const [opponentSelectScreen, setOpponentSelectScreen] = useState([-1, -1]);

  const [playerRating, setPlayerRating] = useState(1480);
  const [opponentRatingValue, setOpponentRatingValue] = useState(
    opponentRating || 1420,
  );
  const [playerID, setPlayerID] = useState(null);
  const [ratingChange, setRatingChange] = useState(null);

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);

  const [showPromotionModal, setShowPromotionModal] = useState(false);

  // SignalR state
  const [isSignalRReady, setIsSignalRReady] = useState(false);
  const [myColor, setMyColor] = useState(playerRole==="creator"?"white":"black");
  const [actualGameCode, setActualGameCode] = useState(gameCode);

  // Initialize board from GameEngine
  useEffect(() => {
    const state = gameEngine.getState();
    setBoard(state.board);
    setCurrentTurn(state.currentTurn);
    setGameStatus(state.gameStatus);
    setWinner(state.winner);
    setIsCheck(state.isCheck);
    setKingInCheckPosition(state.kingInCheckPosition);
    setPendingPromotion(state.pendingPromotion);
  }, []);

  const updateUI = () => {
    const state = gameEngine.getState();
    setBoard([...state.board]);
    setCurrentTurn(state.currentTurn);
    setGameStatus(state.gameStatus);
    setWinner(state.winner);
    setIsCheck(state.isCheck);
    setKingInCheckPosition(state.kingInCheckPosition);
    setPendingPromotion(state.pendingPromotion);

    if (state.pendingPromotion) {
      setShowPromotionModal(true);
    }
  };

  // Connect to SignalR and join/create game
  useEffect(() => {
    const initSignalR = async () => {
      const connected = await SignalRService.startConnection();
      if (!connected) return;

      const joined = await SignalRService.joinGame(
        gameCode,
        playerRole === "creator" ? "ali" : "Reza",
      );
      if (playerRole === "creator") {
        // Create new game
        // const game = await SignalRService.createGame();
        console.log(joined);
        if (!joined) {
          alert("کد بازی اشتباه است یا بازی پر شده");
          window.location.href = "/lobby";
          return;
        }
        let b = joined["_board"];
        gameEngine.updateBoardWithServer(b);
        console.log(b);
        setMyColor("white");
        // Update orientation if creator is white
        setOrientation("white");
      } else {
        // Join existing game
        if (joined) {
          console.log(joined);
          let b = joined["_board"];
          console.log(b);
          gameEngine.updateBoardWithServer(b);

          setMyColor("black");
          setOrientation("black");
        } else {
          alert("کد بازی اشتباه است یا بازی پر شده");
          window.location.href = "/lobby";
          return;
        }
      }
      gameEngine.currentTurn = joined.CurrentTurn;
      updateUI();
      console.log(gameEngine.board);
      setIsSignalRReady(true);
    };

    initSignalR();

    return () => {
      SignalRService.stopConnection();
    };
  }, [playerRole, gameCode]);

  // Listen to server events
  useEffect(() => {
    if (!isSignalRReady) return;

    // When game officially starts (both players ready)
    SignalRService.onReceiveConnectionId((conID) => {
      console.log("connectionid");
      console.log(conID);
      setPlayerID(conID);
    });

    SignalRService.onGameStarted((gamePlayers) => {
      console.log(gamePlayers);
      // Optionally sync board if needed
      setGameStart(true);
    });
    SignalRService.onSelectScreen((color, row, col) => {
      console.log("recieved from", color);
      if (color == myColor) {
        return;
      }
      setOpponentSelectScreen([row, col]);
      setTimeout(() => {
        setOpponentSelectScreen([-1, -1]);
      }, 2000);
    });
    // When opponent makes a move
    SignalRService.onMoveMade(
      (
        fromposition,
        toposition,
        notation,
        color,
        whiteTime,
        blackTime,
        isCheck,
      ) => {
        if (!gameStart) return;

        console.log(
          "movemade",
          fromposition,
          toposition,
          notation,
          color,
          whiteTime,
          blackTime,
          isCheck,
        );

        // moveData: { fromRow, fromCol, toRow, toCol, promotionNeeded, promotionPiece }
        const {
          fromRow,
          fromCol,
          toRow,
          toCol,
          promotionNeeded,
          promotionPiece,
        } = moveData;

        // Apply move to local engine
        const result = gameEngine.makeMove(fromRow, fromCol, toRow, toCol);
        if (result.success) {
          if (promotionNeeded && promotionPiece) {
            gameEngine.promotePawn(promotionPiece);
          }
          updateUI();
          setLastMove({
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
          });
        }
      },
    );

    // When pawn promotion is confirmed by opponent
    SignalRService.onPawnPromoted((position, pieceType) => {
      // Already handled in move, but can sync if needed
    });

    SignalRService.onPlayerJoined((position, pieceType) => {
      // Already handled in move, but can sync if needed
      console.log("player joined");
    });

    // When game ends (checkmate, resign, etc.)
    SignalRService.onGameEnded((message) => {
      setGameStatus("finished");
      // Extract winner from message if needed
      if (message.includes("white wins")) setWinner("white");
      else if (message.includes("black wins")) setWinner("black");
      else setWinner(null); // draw or resign
    });
  }, [isSignalRReady]);

  const handleSquareClick = (row, col) => {
    console.log(row, col, currentTurn,orientation);
    const displayRow = orientation === "white" ? row : 7 - row;
    const displayCol = orientation === "white" ? col : 7 - col;
    // const displayRow=row
    // const displayCol = col
    var res = SignalRService.squareClick(gameCode, myColor, row, col);

    if (gameStatus === "checkmate" || gameStatus === "finished") return;
    if (pendingPromotion) return;
    // Only allow moves if it's my turn and my color matches current turn
    if (currentTurn !== myColor) return;
    console.log(selectedPiece)
    if (selectedPiece) {
      const move = validMoves.find(
        (m) => m.row === displayRow && m.col === displayCol,
      );
      if (move) {
        const result = gameEngine.makeMove(
          selectedPiece.row,
          selectedPiece.col,
          displayRow,
          displayCol,
          move,
        );
        if (result.success) {
          setLastMove({
            from: { row: selectedPiece.row, col: selectedPiece.col },
            to: { row: displayRow, col: displayCol },
          });

          // Send move to server
          const moveData = {
            fromRow: selectedPiece.row,
            fromCol: selectedPiece.col,
            toRow: displayRow,
            toCol: displayCol,
            moveNotation: "", // optional
            promotionNeeded: result.promotionNeeded,
            promotionPiece: null, // will be sent after promotion modal
          };
          let resultmove = SignalRService.sendMove(
            actualGameCode,
            `${moveData.fromRow}${moveData.fromCol}`,
            `${moveData.toRow}${moveData.toCol}`,
            `${moveData.fromRow}${moveData.fromCol}->${moveData.toRow}${moveData.toCol}`,
            orientation,
          );
          if (!resultmove.success) {
            alert("wrong move");
            return;
          }
          if (result.promotionNeeded) {
            setShowPromotionModal(true);
            // Store pending move for later promotion sending
            window.pendingMoveData = moveData;
          } else {
            updateUI();
          }
        }
        setSelectedPiece(null);
        setValidMoves([]);
      } else {
        const piece = board[displayRow][displayCol];
        if (piece) {
          const pieceIsWhite = gameEngine.isWhitePiece(piece);
          if (
            (pieceIsWhite && currentTurn === "white") ||
            (!pieceIsWhite && currentTurn === "black")
          ) {
            const moves = gameEngine.getValidMovesForPiece(
              displayRow,
              displayCol,
              currentTurn,
            );
            setSelectedPiece({ row: displayRow, col: displayCol });
            setValidMoves(moves);
          } else {
            setSelectedPiece(null);
            setValidMoves([]);
          }
        } else {
          setSelectedPiece(null);
          setValidMoves([]);
        }
      }
    } else {
      const piece = board[displayRow][displayCol];
      if (piece) {
        const pieceIsWhite = gameEngine.isWhitePiece(piece);
        if (
          (pieceIsWhite && currentTurn === "white") ||
          (!pieceIsWhite && currentTurn === "black")
        ) {
          const moves = gameEngine.getValidMovesForPiece(
            displayRow,
            displayCol,
            currentTurn,
          );
          setSelectedPiece({ row: displayRow, col: displayCol });
          setValidMoves(moves);
        }
      }
    }
  };

  const handlePromotion = (pieceType) => {
    gameEngine.promotePawn(pieceType);
    setShowPromotionModal(false);
    updateUI();

    // Send promotion info to server
    if (window.pendingMoveData) {
      window.pendingMoveData.promotionPiece = pieceType;
      SignalRService.sendMove(actualGameCode, window.pendingMoveData);
      window.pendingMoveData = null;
    }
  };

  const flipBoard = () => {
    setOrientation(orientation === "white" ? "black" : "white");
    setSelectedPiece(null);
    setValidMoves([]);
  };

  const handleGameEnd = (result) => {
    // Send resignation or draw to server
    if (result === "loss") {
      SignalRService.resignGame(actualGameCode, myColor);
    } else if (result === "draw") {
      SignalRService.offerDraw(actualGameCode);
    }

    if (!isRanked) {
      setRatingChange({ type: result, value: 0 });
      setWinner(
        result === "win"
          ? playerRole === "creator"
            ? "white"
            : "black"
          : result === "loss"
            ? playerRole === "creator"
              ? "black"
              : "white"
            : null,
      );
      setGameStatus("finished");
      return;
    }

    let change = 0;
    let newRating = playerRating;

    if (result === "win") {
      change = Math.floor(Math.random() * 15) + 8;
      newRating = playerRating + change;
      setRatingChange({ type: "win", value: change });
    } else if (result === "loss") {
      change = Math.floor(Math.random() * 15) + 8;
      newRating = playerRating - change;
      setRatingChange({ type: "loss", value: change });
    } else if (result === "draw") {
      change = 0;
      setRatingChange({ type: "draw", value: 0 });
    }

    setPlayerRating(newRating);
    setWinner(
      result === "win"
        ? playerRole === "creator"
          ? "white"
          : "black"
        : result === "loss"
          ? playerRole === "creator"
            ? "black"
            : "white"
          : null,
    );
    setGameStatus("finished");
  };

  return (
    <div className="min-h-screen bg-[#312e2b] pb-4">
      {/* Header */}
      <div className="bg-[#262421] px-4 py-3 flex justify-between items-center border-b border-white/10 sticky top-0 z-10">
        <button className="text-white/70 hover:text-white">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg">
          <span className="text-yellow-500 text-sm">
            {isRanked ? "🏆 رنک شده" : "🎮 دوستانه"}
          </span>
          <span className="text-yellow-500 text-sm">{}</span>
          {!isRanked && actualGameCode && (
            <>
              <span className="text-white/30">•</span>
              <span className="font-mono font-bold tracking-wider text-base text-white">
                {actualGameCode}
              </span>
            </>
          )}
        </div>

        <button
          onClick={() => (window.location.href = "/lobby")}
          className="text-white/70 text-sm px-2 py-1"
        >
          ✕
        </button>
      </div>

      {/* Promotion Modal */}
      {showPromotionModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#262421] rounded-2xl p-6 text-center mx-4">
            <h3 className="text-white text-lg font-bold mb-4">تبدیل سرباز</h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handlePromotion("queen")}
                className="text-4xl p-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition"
              >
                ♕
              </button>
              <button
                onClick={() => handlePromotion("rook")}
                className="text-4xl p-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
              >
                ♖
              </button>
              <button
                onClick={() => handlePromotion("bishop")}
                className="text-4xl p-3 bg-green-600 rounded-xl hover:bg-green-700 transition"
              >
                ♗
              </button>
              <button
                onClick={() => handlePromotion("knight")}
                className="text-4xl p-3 bg-yellow-600 rounded-xl hover:bg-yellow-700 transition"
              >
                ♘
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Winner Display */}
      {(gameStatus === "checkmate" || gameStatus === "finished") && winner && (
        <div className="mx-4 mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-3 text-center">
          <div className="text-white font-bold text-lg">
            {winner === (playerRole === "creator" ? "white" : "black")
              ? "🎉 شما برنده شدید! 🎉"
              : "💔 شما باختید! 💔"}
          </div>
          {isRanked && ratingChange && ratingChange.type === "win" && (
            <div className="text-white/90 text-sm mt-1">
              ⭐ امتیاز شما: +{ratingChange.value}
            </div>
          )}
          {isRanked && ratingChange && ratingChange.type === "loss" && (
            <div className="text-white/90 text-sm mt-1">
              ⭐ امتیاز شما: {ratingChange.value}
            </div>
          )}
        </div>
      )}

      {/* Opponent Info */}
      <div className="px-4 py-3 bg-[#2a2825] mx-2 mt-2 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              {playerRole === "creator" ? "🖤" : "🤍"}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                {playerRole === "creator" ? "حریف (سیاه)" : "حریف (سفید)"}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-[10px]">⭐</span>
                <span className="text-white/60 text-xs">
                  {opponentRatingValue}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/40 text-[10px]">زمان</div>
            <div className="text-white text-sm font-mono">09:45</div>
          </div>
        </div>
      </div>

      {/* Chessboard */}
      <div className="flex justify-center items-center px-2 my-4">
        <div className="relative w-full max-w-[95vw]">
          <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-white/50 text-[11px] font-mono">
            {orientation === "white"
              ? ["8", "7", "6", "5", "4", "3", "2", "1"].map((num) => (
                  <div key={num} className="h-[12.5%] flex items-center">
                    {num}
                  </div>
                ))
              : ["1", "2", "3", "4", "5", "6", "7", "8"].map((num) => (
                  <div key={num} className="h-[12.5%] flex items-center">
                    {num}
                  </div>
                ))}
          </div>

          <div className="absolute -bottom-6 left-0 right-0 flex justify-around text-white/50 text-[11px] font-mono">
            {orientation === "white"
              ? ["h", "g", "f", "e", "d", "c", "b", "a"].map((letter) => (
                  <div key={letter}>{letter}</div>
                ))
              : ["a", "b", "c", "d", "e", "f", "g", "h"].map((letter) => (
                  <div key={letter}>{letter}</div>
                ))}
          </div>

          <div className="bg-[#262421] p-2 rounded-xl shadow-2xl">
            <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
              <div
                className={`grid grid-cols-8 grid-rows-8 gap-0 w-full h-full ${orientation == "white" ? "" : "rotate-180"}`}
              >
                {board.map((row, rowIndex) => {
                  const displayRow =
                    orientation === "white" ? rowIndex : 7 - rowIndex;
                  return row.map((piece, colIndex) => {
                    const displayCol =
                      orientation === "white" ? colIndex : 7 - colIndex;
                    const isLight = (displayRow + displayCol) % 2 === 0;
                    const lightSquare = "#f0d9b5";
                    const darkSquare = "#b58863";
                    let bgColor = isLight ? lightSquare : darkSquare;

                    const isValidMove = validMoves.some(
                      (move) =>
                        move.row === displayRow && move.col === displayCol,
                    );
                    const isSelected =
                      selectedPiece?.row === displayRow &&
                      selectedPiece?.col === displayCol;
                    const isLastMove =
                      lastMove &&
                      ((lastMove.from.row === displayRow &&
                        lastMove.from.col === displayCol) ||
                        (lastMove.to.row === displayRow &&
                          lastMove.to.col === displayCol));

                    const isKingInCheck =
                      kingInCheckPosition &&
                      kingInCheckPosition.row === displayRow &&
                      kingInCheckPosition.col === displayCol;

                    if (isKingInCheck && gameStatus === "check") {
                      bgColor = "#ff4444";
                    }

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                        className={`${orientation == "white" ? "" : "rotate-180"}
                          flex items-center justify-center text-[clamp(16px,8vw,32px)] cursor-pointer transition relative
                          
                          `}
                        style={{ backgroundColor: bgColor }}
                      >
                        {opponentSelectScreen[0] == rowIndex &&
                          opponentSelectScreen[1] == colIndex && (
                            <div className="absolute inset-0 bg-blue-500/30 ring-2 ring-yellow-400 rounded-sm"></div>
                          )}
                        {isValidMove && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[30%] h-[30%] bg-yellow-400/60 rounded-full shadow-lg animate-pulse"></div>
                          </div>
                        )}

                        {isSelected && (
                          <div className="absolute inset-0 bg-yellow-500/30 ring-2 ring-yellow-400 rounded-sm"></div>
                        )}

                        {isLastMove && !isSelected && !isKingInCheck && (
                          <div className="absolute inset-0 bg-green-500/20"></div>
                        )}

                        <span className="drop-shadow-md relative z-10">
                          {piece}
                        </span>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Player Info */}
      <div className="px-4 py-3 bg-[#2a2825] mx-2 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              {playerRole === "creator" ? "🤍" : "🖤"}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                {playerRole === "creator" ? "شما (سفید)" : "شما (سیاه)"}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-[10px]">⭐</span>
                <span className="text-white/60 text-xs">{playerRating}</span>
                {ratingChange && ratingChange.type === "win" && (
                  <span className="text-green-500 text-[10px]">
                    +{ratingChange.value}
                  </span>
                )}
                {ratingChange && ratingChange.type === "loss" && (
                  <span className="text-red-500 text-[10px]">
                    {ratingChange.value}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/40 text-[10px]">زمان</div>
            <div className="text-white text-sm font-mono">10:00</div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex justify-center my-4 px-4">
        <div
          className={`rounded-full px-5 py-2 flex items-center gap-2 ${
            gameStatus === "checkmate"
              ? "bg-red-600/30 border border-red-600"
              : gameStatus === "check"
                ? "bg-red-500/20 border border-red-500/50 animate-pulse"
                : gameStatus === "finished"
                  ? "bg-blue-500/20"
                  : "bg-[#262421]"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              currentTurn === "white" ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-xs font-medium">
            {gameStatus === "checkmate" &&
              `🏆 کیش و مات! برنده: ${winner === "white" ? "سفید" : "سیاه"}`}
            {gameStatus === "check" && "⚠️ کیش! شاه در خطر است!"}
            {gameStatus === "finished" &&
              winner === (playerRole === "creator" ? "white" : "black") &&
              "🎉 شما برنده شدید!"}
            {gameStatus === "finished" &&
              winner !== (playerRole === "creator" ? "white" : "black") &&
              winner !== null &&
              "💔 شما باختید!"}
            {gameStatus === "finished" &&
              winner === null &&
              "🤝 بازی مساوی شد!"}
            {gameStatus === "active" &&
              `⚪ نوبت: ${currentTurn === "white" ? "سفید" : "سیاه"}`}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-4 gap-2 px-4 mt-2">
        <button
          onClick={flipBoard}
          className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="text-[11px]">چرخش</span>
        </button>

        <button
          onClick={() => handleGameEnd("draw")}
          className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="text-[11px]">تساوی</span>
        </button>

        <button
          onClick={() => handleGameEnd("loss")}
          className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <span className="text-[11px]">تسلیم</span>
        </button>

        <button className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          <span className="text-[11px]">تعویض</span>
        </button>
      </div>

      {/* Rating Change Animation */}
      {ratingChange && gameStatus !== "checkmate" && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-lg rounded-xl px-6 py-3 z-50 animate-bounce">
          <div
            className={`text-center ${ratingChange.type === "win" ? "text-green-500" : ratingChange.type === "loss" ? "text-red-500" : "text-yellow-500"}`}
          >
            <div className="text-2xl font-bold">
              {ratingChange.type === "win" && `+${ratingChange.value}`}
              {ratingChange.type === "loss" && `${ratingChange.value}`}
              {ratingChange.type === "draw" && "0"}
            </div>
            <div className="text-xs text-white/70 mt-1">
              {ratingChange.type === "win" && "امتیاز افزایش یافت"}
              {ratingChange.type === "loss" && "امتیاز کاهش یافت"}
              {ratingChange.type === "draw" && "امتیاز تغییر نکرد"}
            </div>
          </div>
        </div>
      )}

      {/* Footer Message */}
      <div className="fixed bottom-2 left-2 right-2">
        <div className="bg-black/80 backdrop-blur-sm text-white/70 text-[10px] px-3 py-1.5 rounded-lg text-center">
          {isRanked ? (
            <span>🏆 بازی رنک شده • برد = +امتیاز • باخت = -امتیاز</span>
          ) : (
            <span>
              💡 کد بازی: {actualGameCode || "XXXXXX"} • این کد را با دوستت به
              اشتراک بگذار
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
