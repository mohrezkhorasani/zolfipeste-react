import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Game() {
  const location = useLocation();
  const { gameCode, playerRole, isRanked, opponentRating } = location.state || {};
  const [orientation, setOrientation] = useState(playerRole === 'creator' ? 'white' : 'black');
  
  // ریتینگ بازیکنان
  const [playerRating, setPlayerRating] = useState(1480);
  const [opponentRatingValue, setOpponentRatingValue] = useState(opponentRating || 1420);
  const [ratingChange, setRatingChange] = useState(null);
  
  // وضعیت بازی
  const [gameStatus, setGameStatus] = useState('active');
  const [currentTurn, setCurrentTurn] = useState('white');
  const [winner, setWinner] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [kingInCheckPosition, setKingInCheckPosition] = useState(null);
  
  // وضعیت قلعه رفتن
  const [whiteKingMoved, setWhiteKingMoved] = useState(false);
  const [whiteRookKingsideMoved, setWhiteRookKingsideMoved] = useState(false);
  const [whiteRookQueensideMoved, setWhiteRookQueensideMoved] = useState(false);
  const [blackKingMoved, setBlackKingMoved] = useState(false);
  const [blackRookKingsideMoved, setBlackRookKingsideMoved] = useState(false);
  const [blackRookQueensideMoved, setBlackRookQueensideMoved] = useState(false);
  
  // وضعیت آنپاسان
  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [lastDoubleMove, setLastDoubleMove] = useState(null);
  
  // لیست مهره‌های سفید و سیاه
  const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
  const blackPieces = ['♚', '♛', '♜', '♝', '♞', '♟'];
  
  // تابع تشخیص سفید بودن مهره
  const isWhitePiece = (piece) => {
    if (!piece) return false;
    return whitePieces.includes(piece);
  };
  
  // تابع تشخیص سیاه بودن مهره
  const isBlackPiece = (piece) => {
    if (!piece) return false;
    return blackPieces.includes(piece);
  };
  
  // پیدا کردن موقعیت شاه
  const findKingPosition = (boardState, color) => {
    const targetKing = color === 'white' ? '♔' : '♚';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (boardState[i][j] === targetKing) {
          return { row: i, col: j };
        }
      }
    }
    return null;
  };
  
  // بررسی آیا خانه زیر حمله است
  const isSquareUnderAttack = (boardState, row, col, defendingColor) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = boardState[i][j];
        if (piece) {
          const isPieceWhite = isWhitePiece(piece);
          const isPieceBlack = isBlackPiece(piece);
          const isAttacker = (defendingColor === 'white' && isPieceBlack) || (defendingColor === 'black' && isPieceWhite);
          
          if (isAttacker) {
            const moves = getValidMovesForPieceWithoutCheck(i, j, boardState, defendingColor === 'white' ? 'black' : 'white');
            if (moves.some(move => move.row === row && move.col === col)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  
  // بررسی آیا حرکت خاصی باعث کیش می‌شود
  const isMoveSafe = (boardState, fromRow, fromCol, toRow, toCol, color) => {
    const testBoard = boardState.map(row => [...row]);
    const piece = testBoard[fromRow][fromCol];
    testBoard[toRow][toCol] = piece;
    testBoard[fromRow][fromCol] = '';
    
    const kingPos = findKingPosition(testBoard, color);
    if (!kingPos) return true;
    
    return !isSquareUnderAttack(testBoard, kingPos.row, kingPos.col, color);
  };
  
  // بررسی حرکت قلعه
  const getCastlingMoves = (boardState, row, col, color) => {
    const moves = [];
    if (color === 'white') {
      // قلعه سمت شاه (Kingside)
      if (!whiteKingMoved && !whiteRookKingsideMoved && 
          !boardState[7][5] && !boardState[7][6] &&
          !isSquareUnderAttack(boardState, 7, 4, 'white') &&
          !isSquareUnderAttack(boardState, 7, 5, 'white') &&
          !isSquareUnderAttack(boardState, 7, 6, 'white')) {
        moves.push({ row: 7, col: 6, isCastling: true, type: 'kingside' });
      }
      // قلعه سمت وزیر (Queenside)
      if (!whiteKingMoved && !whiteRookQueensideMoved && 
          !boardState[7][1] && !boardState[7][2] && !boardState[7][3] &&
          !isSquareUnderAttack(boardState, 7, 4, 'white') &&
          !isSquareUnderAttack(boardState, 7, 3, 'white') &&
          !isSquareUnderAttack(boardState, 7, 2, 'white')) {
        moves.push({ row: 7, col: 2, isCastling: true, type: 'queenside' });
      }
    } else {
      // قلعه سمت شاه (Kingside)
      if (!blackKingMoved && !blackRookKingsideMoved && 
          !boardState[0][5] && !boardState[0][6] &&
          !isSquareUnderAttack(boardState, 0, 4, 'black') &&
          !isSquareUnderAttack(boardState, 0, 5, 'black') &&
          !isSquareUnderAttack(boardState, 0, 6, 'black')) {
        moves.push({ row: 0, col: 6, isCastling: true, type: 'kingside' });
      }
      // قلعه سمت وزیر (Queenside)
      if (!blackKingMoved && !blackRookQueensideMoved && 
          !boardState[0][1] && !boardState[0][2] && !boardState[0][3] &&
          !isSquareUnderAttack(boardState, 0, 4, 'black') &&
          !isSquareUnderAttack(boardState, 0, 3, 'black') &&
          !isSquareUnderAttack(boardState, 0, 2, 'black')) {
        moves.push({ row: 0, col: 2, isCastling: true, type: 'queenside' });
      }
    }
    return moves;
  };
  
  // اجرای حرکت قلعه
  const executeCastling = (color, type) => {
    const newBoard = board.map(row => [...row]);
    if (color === 'white') {
      if (type === 'kingside') {
        newBoard[7][6] = '♔';
        newBoard[7][5] = '♖';
        newBoard[7][4] = '';
        newBoard[7][7] = '';
        setWhiteKingMoved(true);
        setWhiteRookKingsideMoved(true);
      } else {
        newBoard[7][2] = '♔';
        newBoard[7][3] = '♖';
        newBoard[7][4] = '';
        newBoard[7][0] = '';
        setWhiteKingMoved(true);
        setWhiteRookQueensideMoved(true);
      }
    } else {
      if (type === 'kingside') {
        newBoard[0][6] = '♚';
        newBoard[0][5] = '♜';
        newBoard[0][4] = '';
        newBoard[0][7] = '';
        setBlackKingMoved(true);
        setBlackRookKingsideMoved(true);
      } else {
        newBoard[0][2] = '♚';
        newBoard[0][3] = '♜';
        newBoard[0][4] = '';
        newBoard[0][0] = '';
        setBlackKingMoved(true);
        setBlackRookQueensideMoved(true);
      }
    }
    return newBoard;
  };
  
  // بررسی حرکت آنپاسان
  const getEnPassantMoves = (boardState, row, col, piece, color) => {
    const moves = [];
    if (!enPassantTarget) return moves;
    
    const direction = color === 'white' ? -1 : 1;
    const pawnRow = color === 'white' ? 3 : 4;
    
    if (row === pawnRow && (piece === '♙' || piece === '♟')) {
      // بررسی سمت چپ و راست
      for (const dc of [-1, 1]) {
        const newCol = col + dc;
        if (newCol === enPassantTarget.col && 
            lastDoubleMove && 
            lastDoubleMove.toRow === enPassantTarget.row && 
            lastDoubleMove.toCol === enPassantTarget.col) {
          moves.push({ 
            row: row + direction, 
            col: newCol, 
            isEnPassant: true,
            capturedPawnRow: row,
            capturedPawnCol: newCol
          });
        }
      }
    }
    return moves;
  };
  
  // اجرای حرکت آنپاسان
  const executeEnPassant = (boardState, fromRow, fromCol, toRow, toCol, capturedPawnRow, capturedPawnCol) => {
    const newBoard = boardState.map(row => [...row]);
    const piece = newBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = '';
    newBoard[capturedPawnRow][capturedPawnCol] = '';
    return newBoard;
  };
  
  // بررسی حرکات مجاز بدون در نظر گرفتن کیش (برای بررسی حمله)
  const getValidMovesForPieceWithoutCheck = (row, col, boardState, turnColor) => {
    const piece = boardState[row][col];
    if (!piece) return [];
    
    const isWhite = isWhitePiece(piece);
    const moves = [];
    
    // سرباز
    if (piece === '♙' || piece === '♟') {
      const direction = isWhite ? -1 : 1;
      const startRow = isWhite ? 6 : 1;
      
      // حرکت یک خانه جلو
      if (row + direction >= 0 && row + direction < 8 && !boardState[row + direction][col]) {
        moves.push({ row: row + direction, col });
        // حرکت دو خانه از خط شروع
        if (row === startRow && !boardState[row + direction * 2][col]) {
          moves.push({ row: row + direction * 2, col, isDoubleMove: true });
        }
      }
      
      // خوردن مورب (فقط مهره حریف)
      const diagonalMoves = [[row + direction, col - 1], [row + direction, col + 1]];
      for (const [newRow, newCol] of diagonalMoves) {
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && boardState[newRow][newCol]) {
          const targetPiece = boardState[newRow][newCol];
          const isTargetWhite = isWhitePiece(targetPiece);
          const isTargetBlack = isBlackPiece(targetPiece);
          
          if ((isWhite && isTargetBlack) || (!isWhite && isTargetWhite)) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      }
      
      // حرکت آنپاسان
      const enPassantMoves = getEnPassantMoves(boardState, row, col, piece, isWhite ? 'white' : 'black');
      moves.push(...enPassantMoves);
    }
    
    // اسب
    if (piece === '♘' || piece === '♞') {
      const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
      for (const [dr, dc] of knightMoves) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const targetPiece = boardState[newRow][newCol];
          if (!targetPiece) {
            moves.push({ row: newRow, col: newCol });
          } else {
            const isTargetWhite = isWhitePiece(targetPiece);
            const isTargetBlack = isBlackPiece(targetPiece);
            if ((isWhite && isTargetBlack) || (!isWhite && isTargetWhite)) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        }
      }
    }
    
    // فیل، رخ، وزیر
    const slideMoves = (directions) => {
      for (const [dr, dc] of directions) {
        for (let i = 1; i <= 7; i++) {
          const newRow = row + dr * i;
          const newCol = col + dc * i;
          if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
          if (!boardState[newRow][newCol]) {
            moves.push({ row: newRow, col: newCol });
          } else {
            const targetPiece = boardState[newRow][newCol];
            const isTargetWhite = isWhitePiece(targetPiece);
            const isTargetBlack = isBlackPiece(targetPiece);
            if ((isWhite && isTargetBlack) || (!isWhite && isTargetWhite)) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      }
    };
    
    if (piece === '♗' || piece === '♝') {
      slideMoves([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
    } else if (piece === '♖' || piece === '♜') {
      slideMoves([[-1, 0], [1, 0], [0, -1], [0, 1]]);
    } else if (piece === '♕' || piece === '♛') {
      slideMoves([[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]);
    } else if (piece === '♔' || piece === '♚') {
      const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      for (const [dr, dc] of kingMoves) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const targetPiece = boardState[newRow][newCol];
          if (!targetPiece) {
            moves.push({ row: newRow, col: newCol });
          } else {
            const isTargetWhite = isWhitePiece(targetPiece);
            const isTargetBlack = isBlackPiece(targetPiece);
            if ((isWhite && isTargetBlack) || (!isWhite && isTargetWhite)) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        }
      }
      
      // اضافه کردن حرکت قلعه
      const castlingMoves = getCastlingMoves(boardState, row, col, isWhite ? 'white' : 'black');
      moves.push(...castlingMoves);
    }
    
    return moves;
  };
  
  // بررسی حرکات مجاز با در نظر گرفتن کیش
  const getValidMovesForPiece = (row, col, boardState, turnColor) => {
    const piece = boardState[row][col];
    if (!piece) return [];
    
    const isWhite = isWhitePiece(piece);
    if ((isWhite && turnColor !== 'white') || (!isWhite && turnColor !== 'black')) return [];
    
    const potentialMoves = getValidMovesForPieceWithoutCheck(row, col, boardState, turnColor);
    const safeMoves = potentialMoves.filter(move => {
      if (move.isCastling) return true;
      if (move.isEnPassant) {
        const testBoard = boardState.map(row => [...row]);
        const direction = isWhite ? -1 : 1;
        testBoard[move.row][move.col] = piece;
        testBoard[row][col] = '';
        testBoard[move.capturedPawnRow][move.capturedPawnCol] = '';
        const kingPos = findKingPosition(testBoard, turnColor);
        return kingPos && !isSquareUnderAttack(testBoard, kingPos.row, kingPos.col, turnColor);
      }
      return isMoveSafe(boardState, row, col, move.row, move.col, turnColor);
    });
    
    return safeMoves;
  };
  
  // بررسی کیش و مات
  const checkCheckAndCheckmate = (boardState, turnColor) => {
    const kingPos = findKingPosition(boardState, turnColor);
    if (!kingPos) return { isCheck: false, isCheckmate: false };
    
    const underAttack = isSquareUnderAttack(boardState, kingPos.row, kingPos.col, turnColor);
    
    if (!underAttack) {
      return { isCheck: false, isCheckmate: false };
    }
    
    // بررسی آیا حرکتی برای رفع کیش وجود دارد
    let hasAnyMove = false;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = boardState[i][j];
        if (piece) {
          const isPieceWhite = isWhitePiece(piece);
          if ((isPieceWhite && turnColor === 'white') || (!isPieceWhite && turnColor === 'black')) {
            const moves = getValidMovesForPiece(i, j, boardState, turnColor);
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
  };
  
  // به روز رسانی وضعیت کیش و مات
  const updateGameStatus = (newBoard, newTurn) => {
    const { isCheck: check, isCheckmate: checkmate } = checkCheckAndCheckmate(newBoard, newTurn);
    
    setIsCheck(check);
    
    if (checkmate) {
      const winner = newTurn === 'white' ? 'black' : 'white';
      setWinner(winner);
      setGameStatus('checkmate');
      
      if (isRanked && gameStatus === 'active') {
        const playerWon = (winner === 'white' && playerRole === 'creator') || (winner === 'black' && playerRole !== 'creator');
        if (playerWon) {
          handleGameEnd('win');
        } else {
          handleGameEnd('loss');
        }
      }
    } else if (check) {
      setGameStatus('check');
    } else {
      setGameStatus('active');
    }
    
    const kingPos = findKingPosition(newBoard, newTurn);
    setKingInCheckPosition(check ? kingPos : null);
  };
  
  // حالت شطرنج
  const [board, setBoard] = useState([
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
  ]);
  
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  
  // حرکت مهره
  const handleMove = (fromRow, fromCol, toRow, toCol, moveData = null) => {
    let newBoard = board.map(row => [...row]);
    let nextTurn = currentTurn === 'white' ? 'black' : 'white';
    
    // مدیریت قلعه
    if (moveData?.isCastling) {
      newBoard = executeCastling(currentTurn, moveData.type);
      setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol }, isCastling: true });
    }
    // مدیریت آنپاسان
    else if (moveData?.isEnPassant) {
      newBoard = executeEnPassant(newBoard, fromRow, fromCol, toRow, toCol, moveData.capturedPawnRow, moveData.capturedPawnCol);
      setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol }, isEnPassant: true });
      setEnPassantTarget(null);
    }
    // حرکت معمولی
    else {
      const piece = newBoard[fromRow][fromCol];
      newBoard[toRow][toCol] = piece;
      newBoard[fromRow][fromCol] = '';
      
      // بررسی حرکت دو خانه سرباز برای آنپاسان
      if ((piece === '♙' || piece === '♟') && Math.abs(toRow - fromRow) === 2) {
        const enPassantRow = (toRow + fromRow) / 2;
        setEnPassantTarget({ row: enPassantRow, col: toCol });
        setLastDoubleMove({ fromRow, fromCol, toRow, toCol });
      } else {
        setEnPassantTarget(null);
        setLastDoubleMove(null);
      }
      
      // به روز رسانی وضعیت قلعه
      if (piece === '♔') setWhiteKingMoved(true);
      if (piece === '♚') setBlackKingMoved(true);
      if (piece === '♖' && fromRow === 7 && fromCol === 7) setWhiteRookKingsideMoved(true);
      if (piece === '♖' && fromRow === 7 && fromCol === 0) setWhiteRookQueensideMoved(true);
      if (piece === '♜' && fromRow === 0 && fromCol === 7) setBlackRookKingsideMoved(true);
      if (piece === '♜' && fromRow === 0 && fromCol === 0) setBlackRookQueensideMoved(true);
      
      setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } });
    }
    
    setBoard(newBoard);
    setCurrentTurn(nextTurn);
    setSelectedPiece(null);
    setValidMoves([]);
    
    updateGameStatus(newBoard, nextTurn);
  };
  
  // کلیک روی خانه
  const handleSquareClick = (row, col) => {
    const displayRow = orientation === 'white' ? row : 7 - row;
    const displayCol = orientation === 'white' ? col : 7 - col;
    
    if (gameStatus === 'checkmate') return;
    
    if (selectedPiece) {
      const move = validMoves.find(m => m.row === displayRow && m.col === displayCol);
      if (move) {
        handleMove(selectedPiece.row, selectedPiece.col, displayRow, displayCol, move);
      } else {
        const piece = board[displayRow][displayCol];
        if (piece) {
          const isWhite = isWhitePiece(piece);
          if ((isWhite && currentTurn === 'white') || (!isWhite && currentTurn === 'black')) {
            const moves = getValidMovesForPiece(displayRow, displayCol, board, currentTurn);
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
        const isWhite = isWhitePiece(piece);
        if ((isWhite && currentTurn === 'white') || (!isWhite && currentTurn === 'black')) {
          const moves = getValidMovesForPiece(displayRow, displayCol, board, currentTurn);
          setSelectedPiece({ row: displayRow, col: displayCol });
          setValidMoves(moves);
        }
      }
    }
  };
  
  const flipBoard = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
    setSelectedPiece(null);
    setValidMoves([]);
  };
  
  const handleGameEnd = (result) => {
    if (!isRanked) {
      setRatingChange({ type: result, value: 0 });
      setWinner(result === 'win' ? (playerRole === 'creator' ? 'white' : 'black') : 
                   result === 'loss' ? (playerRole === 'creator' ? 'black' : 'white') : null);
      setGameStatus('finished');
      return;
    }
    
    let change = 0;
    let newRating = playerRating;
    
    if (result === 'win') {
      change = Math.floor(Math.random() * 15) + 8;
      newRating = playerRating + change;
      setRatingChange({ type: 'win', value: change });
    } else if (result === 'loss') {
      change = Math.floor(Math.random() * 15) + 8;
      newRating = playerRating - change;
      setRatingChange({ type: 'loss', value: change });
    } else if (result === 'draw') {
      change = 0;
      setRatingChange({ type: 'draw', value: 0 });
    }
    
    setPlayerRating(newRating);
    setWinner(result === 'win' ? (playerRole === 'creator' ? 'white' : 'black') : 
                 result === 'loss' ? (playerRole === 'creator' ? 'black' : 'white') : null);
    setGameStatus('finished');
  };
  
  useEffect(() => {
    updateGameStatus(board, currentTurn);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#312e2b] pb-4">
      
      {/* هدر موبایل */}
      <div className="bg-[#262421] px-4 py-3 flex justify-between items-center border-b border-white/10 sticky top-0 z-10">
        <button className="text-white/70 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg">
          <span className="text-yellow-500 text-sm">{isRanked ? '🏆 رنک شده' : '🎮 دوستانه'}</span>
          {!isRanked && gameCode && (
            <>
              <span className="text-white/30">•</span>
              <span className="font-mono font-bold tracking-wider text-base text-white">{gameCode}</span>
            </>
          )}
        </div>
        
        <button 
          onClick={() => window.location.href = '/lobby'}
          className="text-white/70 text-sm px-2 py-1"
        >
          ✕
        </button>
      </div>
      
      {/* نمایش برنده در صورت مات شدن */}
      {(gameStatus === 'checkmate' || gameStatus === 'finished') && winner && (
        <div className="mx-4 mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-3 text-center">
          <div className="text-white font-bold text-lg">
            {winner === (playerRole === 'creator' ? 'white' : 'black') ? '🎉 شما برنده شدید! 🎉' : '💔 شما باختید! 💔'}
          </div>
          {isRanked && ratingChange && ratingChange.type === 'win' && (
            <div className="text-white/90 text-sm mt-1">⭐ امتیاز شما: +{ratingChange.value}</div>
          )}
          {isRanked && ratingChange && ratingChange.type === 'loss' && (
            <div className="text-white/90 text-sm mt-1">⭐ امتیاز شما: {ratingChange.value}</div>
          )}
        </div>
      )}
      
      {/* اطلاعات بازیکن بالا (حریف) */}
      <div className="px-4 py-3 bg-[#2a2825] mx-2 mt-2 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              {playerRole === 'creator' ? '🖤' : '🤍'}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                {playerRole === 'creator' ? 'حریف (سیاه)' : 'حریف (سفید)'}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-[10px]">⭐</span>
                <span className="text-white/60 text-xs">{opponentRatingValue}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/40 text-[10px]">زمان</div>
            <div className="text-white text-sm font-mono">09:45</div>
          </div>
        </div>
      </div>
      
      {/* تخته شطرنج */}
      <div className="flex justify-center items-center px-2 my-4">
        <div className="relative w-full max-w-[95vw]">
          {/* اعداد کنار تخته */}
          <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-white/50 text-[11px] font-mono">
            {orientation === 'white' 
              ? ['8', '7', '6', '5', '4', '3', '2', '1'].map(num => <div key={num} className="h-[12.5%] flex items-center">{num}</div>)
              : ['1', '2', '3', '4', '5', '6', '7', '8'].map(num => <div key={num} className="h-[12.5%] flex items-center">{num}</div>)
            }
          </div>
          
          {/* حروف پایین تخته */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-around text-white/50 text-[11px] font-mono">
            {orientation === 'white'
              ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => <div key={letter}>{letter}</div>)
              : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'].map(letter => <div key={letter}>{letter}</div>)
            }
          </div>
          
          {/* خود تخته */}
          <div className="bg-[#262421] p-2 rounded-xl shadow-2xl">
            <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
              <div className="grid grid-cols-8 grid-rows-8 gap-0 w-full h-full">
                {board.map((row, rowIndex) => {
                  const displayRow = orientation === 'white' ? rowIndex : 7 - rowIndex;
                  return row.map((piece, colIndex) => {
                    const displayCol = orientation === 'white' ? colIndex : 7 - colIndex;
                    const isLight = (displayRow + displayCol) % 2 === 0;
                    const lightSquare = '#f0d9b5';
                    const darkSquare = '#b58863';
                    let bgColor = isLight ? lightSquare : darkSquare;
                    
                    const isValidMove = validMoves.some(move => move.row === displayRow && move.col === displayCol);
                    const isSelected = selectedPiece?.row === displayRow && selectedPiece?.col === displayCol;
                    const isLastMove = lastMove && (
                      (lastMove.from.row === displayRow && lastMove.from.col === displayCol) ||
                      (lastMove.to.row === displayRow && lastMove.to.col === displayCol)
                    );
                    
                    const isKingInCheck = kingInCheckPosition && 
                                         kingInCheckPosition.row === displayRow && 
                                         kingInCheckPosition.col === displayCol;
                    
                    if (isKingInCheck && gameStatus === 'check') {
                      bgColor = '#ff4444';
                    }
                    
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleSquareClick(displayRow, displayCol)}
                        className="flex items-center justify-center text-[clamp(16px,8vw,32px)] cursor-pointer transition relative"
                        style={{ backgroundColor: bgColor }}
                      >
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
                        
                        <span className="drop-shadow-md relative z-10">{piece}</span>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* اطلاعات بازیکن پایین (خودت) */}
      <div className="px-4 py-3 bg-[#2a2825] mx-2 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              {playerRole === 'creator' ? '🤍' : '🖤'}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">
                {playerRole === 'creator' ? 'شما (سفید)' : 'شما (سیاه)'}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-[10px]">⭐</span>
                <span className="text-white/60 text-xs">{playerRating}</span>
                {ratingChange && ratingChange.type === 'win' && (
                  <span className="text-green-500 text-[10px]">+{ratingChange.value}</span>
                )}
                {ratingChange && ratingChange.type === 'loss' && (
                  <span className="text-red-500 text-[10px]">{ratingChange.value}</span>
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
      
      {/* نوار وضعیت نوبت */}
      <div className="flex justify-center my-4 px-4">
        <div className={`rounded-full px-5 py-2 flex items-center gap-2 ${
          gameStatus === 'checkmate' ? 'bg-red-600/30 border border-red-600' :
          gameStatus === 'check' ? 'bg-red-500/20 border border-red-500/50 animate-pulse' :
          gameStatus === 'finished' ? 'bg-blue-500/20' : 'bg-[#262421]'
        }`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            currentTurn === 'white' ? 'bg-white' : 'bg-gray-400'
          }`}></div>
          <span className="text-xs font-medium">
            {gameStatus === 'checkmate' && `🏆 کیش و مات! برنده: ${winner === 'white' ? 'سفید' : 'سیاه'}`}
            {gameStatus === 'check' && '⚠️ کیش! شاه در خطر است!'}
            {gameStatus === 'finished' && winner === (playerRole === 'creator' ? 'white' : 'black') && '🎉 شما برنده شدید!'}
            {gameStatus === 'finished' && winner !== (playerRole === 'creator' ? 'white' : 'black') && winner !== null && '💔 شما باختید!'}
            {gameStatus === 'finished' && winner === null && '🤝 بازی مساوی شد!'}
            {gameStatus === 'active' && `⚪ نوبت: ${currentTurn === 'white' ? 'سفید' : 'سیاه'}`}
          </span>
        </div>
      </div>
      
      {/* دکمه‌های کنترل */}
      <div className="grid grid-cols-4 gap-2 px-4 mt-2">
        <button 
          onClick={flipBoard}
          className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="text-[11px]">چرخش</span>
        </button>
        
        <button 
          onClick={() => handleGameEnd('draw')}
          className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-[11px]">تساوی</span>
        </button>
        
        <button 
          onClick={() => handleGameEnd('loss')}
          className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <span className="text-[11px]">تسلیم</span>
        </button>
        
        <button className="bg-[#262421] hover:bg-[#363331] text-white/80 text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1 active:scale-98">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          <span className="text-[11px]">تعویض</span>
        </button>
      </div>
      
      {/* نمایش تغییر ریتینگ */}
      {ratingChange && gameStatus !== 'checkmate' && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-lg rounded-xl px-6 py-3 z-50 animate-bounce">
          <div className={`text-center ${ratingChange.type === 'win' ? 'text-green-500' : ratingChange.type === 'loss' ? 'text-red-500' : 'text-yellow-500'}`}>
            <div className="text-2xl font-bold">
              {ratingChange.type === 'win' && `+${ratingChange.value}`}
              {ratingChange.type === 'loss' && `${ratingChange.value}`}
              {ratingChange.type === 'draw' && '0'}
            </div>
            <div className="text-xs text-white/70 mt-1">
              {ratingChange.type === 'win' && 'امتیاز افزایش یافت'}
              {ratingChange.type === 'loss' && 'امتیاز کاهش یافت'}
              {ratingChange.type === 'draw' && 'امتیاز تغییر نکرد'}
            </div>
          </div>
        </div>
      )}
      
      {/* پیام پایین صفحه */}
      <div className="fixed bottom-2 left-2 right-2">
        <div className="bg-black/80 backdrop-blur-sm text-white/70 text-[10px] px-3 py-1.5 rounded-lg text-center">
          {isRanked ? (
            <span>🏆 بازی رنک شده • برد = +امتیاز • باخت = -امتیاز</span>
          ) : (
            <span>💡 کد بازی: {gameCode || 'XXXXXX'} • این کد را با دوستت به اشتراک بگذار</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;