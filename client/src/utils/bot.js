import Game from './Game'
import {pieces} from '../components/play/ChessBoard'


export default function minimax( depth, alpha, beta, isMaximizingPlayer, color,oldCapturedPieces = [],currentMove='') {
    const game = new Game(pieces, color)

    const newGameMoves = game.getAllPiecesAllowedMoves()
    console.log(depth);
    let currMove;
    let capturedPieces = oldCapturedPieces;
    // Maximum depth exceeded 
    if (depth === 0 || newGameMoves.length === 0) {
      return evaluateBoard(game,capturedPieces,currentMove);
    }
  
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    let bestMove;
    for (var i = 0; i < newGameMoves.length; i++) {
      currMove = newGameMoves[i];

      const pieceValue = pieceValues[currMove[3]][currMove[2]];
      const isNumeric = !isNaN(Number(currMove[4]));
      const pieceName = isNumeric ? pieceValue + currMove[4] : pieceValue;
      const piece = game.getPieceByName(pieceName)
      game.setClickedPiece(piece);

       const existingPiece = game.getPieceByPos(`${currMove[0]}${currMove[1]}`)
      if (existingPiece && existingPiece.color[0] !== currMove[4] ) {
        capturedPieces.push(existingPiece)
        game.pieces.splice(game.pieces.indexOf(existingPiece), 1)
      };

      const originalPosition = piece.position
      piece.changePosition(`${currMove[0]}${currMove[1]}`)

      // var newSum = evaluateBoard( game, color);
      let childValue = minimax(
        depth - 1,
        alpha,
        beta,
        !isMaximizingPlayer,
        color,
        capturedPieces,
        currMove
      );
      piece.changePosition(originalPosition);
      game.setClickedPiece(null)
      if(existingPiece) game.pieces.push(existingPiece);

      if (isMaximizingPlayer) {
        if (childValue > maxValue) {
          maxValue = childValue;
          bestMove = currMove;
        }
        if (childValue > alpha) {
          alpha = childValue;
        }
      } else {
        if (childValue < minValue) {
          minValue = childValue;
          bestMove = currMove;
        }
        if (childValue < beta) {
          beta = childValue;
        }
      }
  
      // Alpha-beta pruning
      if (alpha >= beta) {
        break;
      }
    }
    console.log(bestMove);
    return bestMove;
  }
  function evaluateBoard(game,capturedPieces,move) {
    let prevSum = 0;

    if (game.king_dead(game.turn)) {
        return 10 ** 10;
    }
      // Our king's in checkmate (bad for us)
    else if(game.king_dead(game.turn == 'white' ? 'black': 'white')) {
      return -(10 ** 10);
    }
  
    // if (game.in_draw() || game.in_threefold_repetition() || game.in_stalemate())
    // {
    //   return 0;
    // }
  
    if (game.king_checked(game.turn)) {
      // Opponent is in check (good for us)
        prevSum += 50;
     
      }   // Our king's in check (bad for us)
      else if(game.king_checked(game.turn == 'white' ? 'black' : 'white')) {
        prevSum -= 50;
      }
    
  
    // Change endgame behavior for kings
    // if (prevSum < -1500) {
    //   if (move.piece === 'k') {
    //     move.piece = 'k_e';
    //   }
    //   // Kings can never be captured
    //   // else if (move.captured === 'k') {
    //   //   move.captured = 'k_e';
    //   // }
    // }

    if(capturedPieces){
      for(let piece of capturedPieces){
        if(piece.color == game.turn){
          prevSum -= piece.weight
        }else{
          prevSum += piece.weight
        }
          
      }
    }
  
    return prevSum;
  }

const pieceValues = {
  'b': {
    'B': 'blackBishop',
    'K': 'blackKing',
    'N': 'blackKnight',
    'P': 'blackPawn',
    'Q': 'blackQueen',
    'R': 'blackRook',
  },
  'w': {
    'B': 'whiteBishop',
    'K': 'whiteKing',
    'N': 'whiteKnight',
    'P': 'whitePawn',
    'Q': 'whiteQueen',
    'R': 'whiteRook',
  }
}