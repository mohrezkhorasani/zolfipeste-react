// GameEngine.js
class GameEngine {
  static whitePieces = ["♔", "♕", "♖", "♗", "♘", "♙"];
  static blackPieces = ["♚", "♛", "♜", "♝", "♞", "♟"];

  constructor() {
    this.board = this.getInitialBoard();
    this.currentTurn = "white";
    this.gameStatus = "active";
    this.winner = null;
    this.isCheck = false;
    this.kingInCheckPosition = null;

    // Castling rights
    this.whiteKingMoved = false;
    this.whiteRookKingsideMoved = false;
    this.whiteRookQueensideMoved = false;
    this.blackKingMoved = false;
    this.blackRookKingsideMoved = false;
    this.blackRookQueensideMoved = false;

    // En passant
    this.enPassantTarget = null;
    this.lastDoubleMove = null;

    // Promotion
    this.pendingPromotion = null;
  }

  isWhitePiece(piece) {
    if (!piece) return false;
    return GameEngine.whitePieces.includes(piece);
  }

  isBlackPiece(piece) {
    if (!piece) return false;
    return GameEngine.blackPieces.includes(piece);
  }

  getInitialBoard() {
    return [
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "♘", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      ["♖", "♘", "♗", "♕", "♔", "♗", "", "♖"],
    ];
  }
  updateBoardWithServer(board) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = this.convertCharToPice(board[i][j]);
      }
    }
    return this.board
  }
  convertCharToPice(boardItem) {
    if(boardItem==null)return ""
    let Color = boardItem.Color
    switch (boardItem["Type"]) {
      case "knight":
        return Color == "white" ? "♘" : "♞";
      case "rook":
        return Color == "white" ? "♖" : "♜";
      case "pawn":
        return Color == "white" ? "♙" : "♟";
      case "bishop":
        return Color == "white" ? "♗" : "♝";
      case "queen":
        return Color == "white" ? "♕" : "♛";
      case "king":
        return Color == "white" ? "♔" : "♚";
    }
  }
  findKingPosition(boardState, color) {
    const targetKing = color === "white" ? "♔" : "♚";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (boardState[i][j] === targetKing) {
          return { row: i, col: j };
        }
      }
    }
    return null;
  }

  isSquareUnderAttack(boardState, row, col, defendingColor) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = boardState[i][j];
        if (piece) {
          const isAttacker =
            (defendingColor === "white" && this.isBlackPiece(piece)) ||
            (defendingColor === "black" && this.isWhitePiece(piece));
          if (isAttacker) {
            const moves = this.getValidMovesForPieceWithoutCheck(
              i,
              j,
              boardState,
              defendingColor === "white" ? "black" : "white",
            );
            if (moves.some((move) => move.row === row && move.col === col)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  isMoveSafe(boardState, fromRow, fromCol, toRow, toCol, color) {
    const testBoard = boardState.map((row) => [...row]);
    const piece = testBoard[fromRow][fromCol];
    testBoard[toRow][toCol] = piece;
    testBoard[fromRow][fromCol] = "";

    const kingPos = this.findKingPosition(testBoard, color);
    if (!kingPos) return true;
    return !this.isSquareUnderAttack(
      testBoard,
      kingPos.row,
      kingPos.col,
      color,
    );
  }

  getCastlingMoves(boardState, row, col, color) {
    const moves = [];
    if (color === "white") {
      if (
        !this.whiteKingMoved &&
        !this.whiteRookKingsideMoved &&
        !boardState[7][5] &&
        !boardState[7][6] &&
        !this.isSquareUnderAttack(boardState, 7, 4, "white") &&
        !this.isSquareUnderAttack(boardState, 7, 5, "white") &&
        !this.isSquareUnderAttack(boardState, 7, 6, "white")
      ) {
        moves.push({ row: 7, col: 6, isCastling: true, type: "kingside" });
      }
      if (
        !this.whiteKingMoved &&
        !this.whiteRookQueensideMoved &&
        !boardState[7][1] &&
        !boardState[7][2] &&
        !boardState[7][3] &&
        !this.isSquareUnderAttack(boardState, 7, 4, "white") &&
        !this.isSquareUnderAttack(boardState, 7, 3, "white") &&
        !this.isSquareUnderAttack(boardState, 7, 2, "white")
      ) {
        moves.push({ row: 7, col: 2, isCastling: true, type: "queenside" });
      }
    } else {
      if (
        !this.blackKingMoved &&
        !this.blackRookKingsideMoved &&
        !boardState[0][5] &&
        !boardState[0][6] &&
        !this.isSquareUnderAttack(boardState, 0, 4, "black") &&
        !this.isSquareUnderAttack(boardState, 0, 5, "black") &&
        !this.isSquareUnderAttack(boardState, 0, 6, "black")
      ) {
        moves.push({ row: 0, col: 6, isCastling: true, type: "kingside" });
      }
      if (
        !this.blackKingMoved &&
        !this.blackRookQueensideMoved &&
        !boardState[0][1] &&
        !boardState[0][2] &&
        !boardState[0][3] &&
        !this.isSquareUnderAttack(boardState, 0, 4, "black") &&
        !this.isSquareUnderAttack(boardState, 0, 3, "black") &&
        !this.isSquareUnderAttack(boardState, 0, 2, "black")
      ) {
        moves.push({ row: 0, col: 2, isCastling: true, type: "queenside" });
      }
    }
    return moves;
  }

  getEnPassantMoves(boardState, row, col, piece, color) {
    const moves = [];
    if (!this.enPassantTarget) return moves;
    const direction = color === "white" ? -1 : 1;
    const pawnRow = color === "white" ? 3 : 4;
    if (row === pawnRow && (piece === "♙" || piece === "♟")) {
      for (const dc of [-1, 1]) {
        const newCol = col + dc;
        if (
          newCol === this.enPassantTarget.col &&
          this.lastDoubleMove &&
          this.lastDoubleMove.toRow === this.enPassantTarget.row &&
          this.lastDoubleMove.toCol === this.enPassantTarget.col
        ) {
          moves.push({
            row: row + direction,
            col: newCol,
            isEnPassant: true,
            capturedPawnRow: row,
            capturedPawnCol: newCol,
          });
        }
      }
    }
    return moves;
  }

  getValidMovesForPieceWithoutCheck(row, col, boardState, turnColor) {
    const piece = boardState[row][col];
    if (!piece) return [];
    const isWhite = this.isWhitePiece(piece);
    const moves = [];

    // Pawn
    if (piece === "♙" || piece === "♟") {
      const direction = isWhite ? -1 : 1;
      const startRow = isWhite ? 6 : 1;
      // one step
      if (
        row + direction >= 0 &&
        row + direction < 8 &&
        !boardState[row + direction][col]
      ) {
        moves.push({ row: row + direction, col });
        // two steps
        if (row === startRow && !boardState[row + direction * 2][col]) {
          moves.push({ row: row + direction * 2, col, isDoubleMove: true });
        }
      }
      // diagonal captures
      for (const dc of [-1, 1]) {
        const newRow = row + direction;
        const newCol = col + dc;
        if (
          newRow >= 0 &&
          newRow < 8 &&
          newCol >= 0 &&
          newCol < 8 &&
          boardState[newRow][newCol]
        ) {
          const targetPiece = boardState[newRow][newCol];
          if (
            (isWhite && this.isBlackPiece(targetPiece)) ||
            (!isWhite && this.isWhitePiece(targetPiece))
          ) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      }
      // en passant
      const enPassantMoves = this.getEnPassantMoves(
        boardState,
        row,
        col,
        piece,
        isWhite ? "white" : "black",
      );
      moves.push(...enPassantMoves);
    }

    // Knight
    if (piece === "♘" || piece === "♞") {
      const knightOffsets = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
      ];
      for (const [dr, dc] of knightOffsets) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const target = boardState[newRow][newCol];
          if (!target) {
            moves.push({ row: newRow, col: newCol });
          } else if (
            (isWhite && this.isBlackPiece(target)) ||
            (!isWhite && this.isWhitePiece(target))
          ) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      }
    }

    // Sliding pieces: bishop, rook, queen
    const slide = (directions) => {
      for (const [dr, dc] of directions) {
        for (let i = 1; i <= 7; i++) {
          const newRow = row + dr * i;
          const newCol = col + dc * i;
          if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
          if (!boardState[newRow][newCol]) {
            moves.push({ row: newRow, col: newCol });
          } else {
            const target = boardState[newRow][newCol];
            if (
              (isWhite && this.isBlackPiece(target)) ||
              (!isWhite && this.isWhitePiece(target))
            ) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      }
    };

    if (piece === "♗" || piece === "♝") {
      slide([
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ]);
    } else if (piece === "♖" || piece === "♜") {
      slide([
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]);
    } else if (piece === "♕" || piece === "♛") {
      slide([
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]);
    } else if (piece === "♔" || piece === "♚") {
      const kingOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      for (const [dr, dc] of kingOffsets) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const target = boardState[newRow][newCol];
          if (!target) {
            moves.push({ row: newRow, col: newCol });
          } else if (
            (isWhite && this.isBlackPiece(target)) ||
            (!isWhite && this.isWhitePiece(target))
          ) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      }
      const castlingMoves = this.getCastlingMoves(
        boardState,
        row,
        col,
        isWhite ? "white" : "black",
      );
      moves.push(...castlingMoves);
    }

    return moves;
  }

  getValidMovesForPiece(row, col, turnColor) {
    const piece = this.board[row][col];
    if (!piece) return [];
    const isWhite = this.isWhitePiece(piece);
    if (
      (isWhite && turnColor !== "white") ||
      (!isWhite && turnColor !== "black")
    )
      return [];

    const potentialMoves = this.getValidMovesForPieceWithoutCheck(
      row,
      col,
      this.board,
      turnColor,
    );
    const safeMoves = potentialMoves.filter((move) => {
      if (move.isCastling) return true;
      if (move.isEnPassant) {
        const testBoard = this.board.map((r) => [...r]);
        const direction = isWhite ? -1 : 1;
        testBoard[move.row][move.col] = piece;
        testBoard[row][col] = "";
        testBoard[move.capturedPawnRow][move.capturedPawnCol] = "";
        const kingPos = this.findKingPosition(testBoard, turnColor);
        return (
          kingPos &&
          !this.isSquareUnderAttack(
            testBoard,
            kingPos.row,
            kingPos.col,
            turnColor,
          )
        );
      }
      return this.isMoveSafe(
        this.board,
        row,
        col,
        move.row,
        move.col,
        turnColor,
      );
    });
    return safeMoves;
  }

  checkCheckAndCheckmate(boardState, turnColor) {
    const kingPos = this.findKingPosition(boardState, turnColor);
    if (!kingPos) return { isCheck: false, isCheckmate: false };
    const underAttack = this.isSquareUnderAttack(
      boardState,
      kingPos.row,
      kingPos.col,
      turnColor,
    );
    if (!underAttack) return { isCheck: false, isCheckmate: false };

    let hasAnyMove = false;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = boardState[i][j];
        if (piece) {
          const isPieceWhite = this.isWhitePiece(piece);
          if (
            (isPieceWhite && turnColor === "white") ||
            (!isPieceWhite && turnColor === "black")
          ) {
            // Temporarily set board to current board to use getValidMovesForPiece (needs this.board)
            const originalBoard = this.board;
            this.board = boardState;
            const moves = this.getValidMovesForPiece(i, j, turnColor);
            this.board = originalBoard;
            if (moves.length > 0) {
              hasAnyMove = true;
              break;
            }
          }
        }
      }
      if (hasAnyMove) break;
    }
    return { isCheck: true, isCheckmate: !hasAnyMove };
  }

  executeCastling(color, type) {
    const newBoard = this.board.map((row) => [...row]);
    if (color === "white") {
      if (type === "kingside") {
        newBoard[7][6] = "♔";
        newBoard[7][5] = "♖";
        newBoard[7][4] = "";
        newBoard[7][7] = "";
        this.whiteKingMoved = true;
        this.whiteRookKingsideMoved = true;
      } else {
        newBoard[7][2] = "♔";
        newBoard[7][3] = "♖";
        newBoard[7][4] = "";
        newBoard[7][0] = "";
        this.whiteKingMoved = true;
        this.whiteRookQueensideMoved = true;
      }
    } else {
      if (type === "kingside") {
        newBoard[0][6] = "♚";
        newBoard[0][5] = "♜";
        newBoard[0][4] = "";
        newBoard[0][7] = "";
        this.blackKingMoved = true;
        this.blackRookKingsideMoved = true;
      } else {
        newBoard[0][2] = "♚";
        newBoard[0][3] = "♜";
        newBoard[0][4] = "";
        newBoard[0][0] = "";
        this.blackKingMoved = true;
        this.blackRookQueensideMoved = true;
      }
    }
    return newBoard;
  }

  executeEnPassant(
    fromRow,
    fromCol,
    toRow,
    toCol,
    capturedPawnRow,
    capturedPawnCol,
  ) {
    const newBoard = this.board.map((row) => [...row]);
    const piece = newBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = "";
    newBoard[capturedPawnRow][capturedPawnCol] = "";
    return newBoard;
  }

  checkPromotion(row, col, piece) {
    if ((piece === "♙" && row === 0) || (piece === "♟" && row === 7)) {
      this.pendingPromotion = {
        row,
        col,
        color: this.isWhitePiece(piece) ? "white" : "black",
      };
      return true;
    }
    return false;
  }

  promotePawn(pieceType) {
    if (!this.pendingPromotion) return false;
    const promotionMap = {
      queen: this.pendingPromotion.color === "white" ? "♕" : "♛",
      rook: this.pendingPromotion.color === "white" ? "♖" : "♜",
      bishop: this.pendingPromotion.color === "white" ? "♗" : "♝",
      knight: this.pendingPromotion.color === "white" ? "♘" : "♞",
    };
    const newBoard = this.board.map((row) => [...row]);
    newBoard[this.pendingPromotion.row][this.pendingPromotion.col] =
      promotionMap[pieceType];
    this.board = newBoard;
    this.pendingPromotion = null;
    this.currentTurn = this.currentTurn === "white" ? "black" : "white";
    this.updateGameStatus();
    return true;
  }

  makeMove(fromRow, fromCol, toRow, toCol, moveData = null) {
    let newBoard = this.board.map((row) => [...row]);
    let nextTurn = this.currentTurn === "white" ? "black" : "white";
    let promotionNeeded = false;

    if (moveData?.isCastling) {
      newBoard = this.executeCastling(this.currentTurn, moveData.type);
    } else if (moveData?.isEnPassant) {
      newBoard = this.executeEnPassant(
        fromRow,
        fromCol,
        toRow,
        toCol,
        moveData.capturedPawnRow,
        moveData.capturedPawnCol,
      );
      this.enPassantTarget = null;
    } else {
      const piece = newBoard[fromRow][fromCol];
      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = "";

      // Update en passant target
      if ((piece === "♙" || piece === "♟") && Math.abs(toRow - fromRow) === 2) {
        const enPassantRow = (toRow + fromRow) / 2;
        this.enPassantTarget = { row: enPassantRow, col: toCol };
        this.lastDoubleMove = { fromRow, fromCol, toRow, toCol };
      } else {
        this.enPassantTarget = null;
        this.lastDoubleMove = null;
      }

      // Update castling rights
      if (piece === "♔") this.whiteKingMoved = true;
      if (piece === "♚") this.blackKingMoved = true;
      if (piece === "♖" && fromRow === 7 && fromCol === 7)
        this.whiteRookKingsideMoved = true;
      if (piece === "♖" && fromRow === 7 && fromCol === 0)
        this.whiteRookQueensideMoved = true;
      if (piece === "♜" && fromRow === 0 && fromCol === 7)
        this.blackRookKingsideMoved = true;
      if (piece === "♜" && fromRow === 0 && fromCol === 0)
        this.blackRookQueensideMoved = true;

      promotionNeeded = this.checkPromotion(toRow, toCol, piece);
    }

    this.board = newBoard;
    if (!promotionNeeded) {
      this.currentTurn = nextTurn;
      this.updateGameStatus();
    }

    return { success: true, promotionNeeded, nextTurn };
  }

  updateGameStatus() {
    const { isCheck, isCheckmate } = this.checkCheckAndCheckmate(
      this.board,
      this.currentTurn,
    );
    this.isCheck = isCheck;
    if (isCheckmate) {
      this.winner = this.currentTurn === "white" ? "black" : "white";
      this.gameStatus = "checkmate";
    } else if (isCheck) {
      this.gameStatus = "check";
    } else {
      this.gameStatus = "active";
    }
    const kingPos = this.findKingPosition(this.board, this.currentTurn);
    this.kingInCheckPosition = isCheck ? kingPos : null;
  }

  getState() {
    return {
      board: this.board,
      currentTurn: this.currentTurn,
      gameStatus: this.gameStatus,
      winner: this.winner,
      isCheck: this.isCheck,
      kingInCheckPosition: this.kingInCheckPosition,
      pendingPromotion: this.pendingPromotion,
    };
  }

  resetGame() {
    this.board = this.getInitialBoard();
    this.currentTurn = "white";
    this.gameStatus = "active";
    this.winner = null;
    this.isCheck = false;
    this.kingInCheckPosition = null;
    this.whiteKingMoved = false;
    this.whiteRookKingsideMoved = false;
    this.whiteRookQueensideMoved = false;
    this.blackKingMoved = false;
    this.blackRookKingsideMoved = false;
    this.blackRookQueensideMoved = false;
    this.enPassantTarget = null;
    this.lastDoubleMove = null;
    this.pendingPromotion = null;
  }
}

export default GameEngine;
