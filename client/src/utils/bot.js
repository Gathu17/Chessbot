import Game from './Game'
import {pieces} from '../components/play/ChessBoard'
import { generateGameHash } from './hash';

const transpositionTable = new Map();
export default function minimax( bot,depth, alpha, beta, isMaximizingPlayer, color,oldCapturedPieces = [],currentMove='') {
  
    const game = new Game(pieces, color,bot)
  
    const newGameMoves = game.getAllPiecesAllowedMovesByColor(color)
  
    let currMove;
    let capturedPieces = [...oldCapturedPieces];
    // // Maximum depth exceeded 
    if (depth === 0 || newGameMoves.length === 0) {
      let sum = evaluateBoard(game,capturedPieces,currentMove);
      return [null,sum]
    }

    
    const gameHash = generateGameHash(game.pieces);

    if (depth > 2 && !isMaximizingPlayer) {
      let nullMoveValue = -minimax(bot, depth - 2, -beta, -beta + 1, !isMaximizingPlayer, color, capturedPieces, currMove)[1];
    
      // If the null move evaluation suggests the opponent's position is very favorable, cut off the search.
      if (nullMoveValue >= beta) {
        storeTranspositionEntry(gameHash, null, nullMoveValue, depth, 'lower');
        return [null, nullMoveValue];
      }
    }
    
    // debugger

    if (transpositionTable.has(gameHash)) {
      const entry = transpositionTable.get(gameHash);
      if (entry.type === 'exact' || (entry.type === 'lower' && entry.value >= beta) || (entry.type === 'upper' && entry.value <= alpha)) {
         console.log(entry);
          return [entry.bestMove, entry.value];
      }
    }
  
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    let bestMove = '';
    let bestMoveValue = 0;
    const reductionDepth = 1; // Adjust this value based on your testing
    const reductionThreshold = 2;
    for (var i = 0; i < newGameMoves.length; i++) {
      currMove = newGameMoves[i];
      const pieceValue = pieceValues[currMove[3]][currMove[2]];
      const isNumeric = !isNaN(Number(currMove[4]));
      const pieceName = isNumeric ? pieceValue + currMove[4] : pieceValue;
      const piece = game.getPieceByName(pieceName)
      game.setClickedBotPiece(piece);

      const existingPiece = game.getPieceByPos(`${currMove[0]}${currMove[1]}`)
      // debugger
      if (existingPiece && existingPiece.color[0] !== currMove[4] ) {

        capturedPieces.push(existingPiece)
        game.pieces.splice(game.pieces.indexOf(existingPiece), 1)
      };

      const originalPosition = piece.position
      game.setClickedBotPiece(null);
      piece.changePosition(`${currMove[0]}${currMove[1]}`)

      if (i >= reductionThreshold && depth > reductionDepth && !existingPiece) {
        const reducedDepth = depth - reductionDepth;
        let [_, lmrValue] = minimax(
          bot,
          reducedDepth - 1,
          alpha,
          beta,
          !isMaximizingPlayer,
          color == 'white' ? 'black' : 'white',
          capturedPieces,
          currMove
        );
  
        // Full search if LMR gives a good result
        if (lmrValue >= beta) {
          var [childBestMove, childValue] = minimax(
            bot,
            reducedDepth,
            alpha,
            beta,
            !isMaximizingPlayer,
            color == 'white' ? 'black' : 'white',
            capturedPieces,
            currMove
          );
        }
      } else{
        var [childBestMove,childValue] = minimax(
          bot,
          depth - 1,
          alpha,
          beta,
          !isMaximizingPlayer,
          color == 'white' ? 'black' : 'white',
          capturedPieces,
          currMove,
        );
  
      }
       

      // var newSum = evaluateBoard( game, color);
      
      piece.changePosition(originalPosition);
      game.setClickedPiece(null)
      if(existingPiece) game.pieces.push(existingPiece);

      if (game.bot.color == color) {
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
        storeTranspositionEntry(gameHash, bestMove, maxValue, depth, 'lower');
        break;
      }else{
        storeTranspositionEntry(gameHash, bestMove, minValue, depth, 'upper');
      }
    }
    // console.log(transpositionTable);
    if (isMaximizingPlayer) {
      return [bestMove, maxValue];
    } else {
      return [bestMove, minValue];
    }
    
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
     
    if (game.king_checked(game.bot.color)) {
       // Our king's in check (bad for us)
        prevSum -= 50;
      // Opponent is in check (good for us)
      }   
      else if(game.king_checked(game.bot.color == 'white' ? 'black' : 'white')) {
        prevSum += 50;
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

    if(capturedPieces[0]){
      // console.log(move,capturedPieces,game.turn);
      for(let piece of capturedPieces){
        if(piece.color == game.bot.color){
          // console.log('imekulwa');
          prevSum -= piece.weight
        }else{
          prevSum += piece.weight
        }
          
      }
    }

  
    return prevSum;
  }
  function storeTranspositionEntry(hash, bestMove, value, depth, type) {
    transpositionTable.set(hash, { bestMove, value, depth, type });
  }


export const pieceValues = {
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