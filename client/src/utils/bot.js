import Game from './Game'
import {pieces} from '../components/play/ChessBoard'


export default function minimax( depth, alpha, beta, isMaximizingPlayer,piece, color,oldCapturedPieces = [],currentMove='') {
    // positionCount++;
    let originalPos = piece.position;
    const game = new Game(pieces, color)
    // const piece = game.clickedPiece;
    const newGameMoves = game.getAllPiecesAllowedMoves()
    console.log(newGameMoves);
  //   var children = game.ugly_moves({ verbose: true });
  
  //   // Sort moves randomly, so the same move isn't always picked on ties
  //   children.sort(function (a, b) {
  //     return 0.5 - Math.random();
  //   });
  
    let currMove;
    let capturedPieces = oldCapturedPieces;
    // Maximum depth exceeded or node is a terminal node (no children)
    if (depth === 0 || newGameMoves.length === 0) {
      return evaluateBoard(game,capturedPieces,currentMove);
    }
  
  //   // Find maximum/minimum from list of 'children' (possible moves)
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    let bestMove;
    for (var i = 0; i < newGameMoves.length; i++) {
      // let bestMove = -9999;
      currMove = newGameMoves[i];
  
      // // Note: in our case, the 'children' are simply modified game states
      // var currPrettyMove = game.ugly_move(currMove);
      const existingPiece = game.getPieceByPos(`${currMove[0]}${currMove[1]}`)
      if (existingPiece && existingPiece.color[0] !== currMove[4] ) {
        capturedPieces.push(existingPiece)
        game.pieces.splice(game.pieces.indexOf(existingPiece), 1)
      };
      piece.changePosition(`${currMove[0]}${currMove[1]}`)

      // var newSum = evaluateBoard( game, color);
      let childValue = Math.max(maxValue,minimax(
        depth - 1,
        alpha,
        beta,
        !isMaximizingPlayer,
        piece,
        color,
        capturedPieces,
        currMove
      ));
      //  alpha = Math.max(alpha, maxValue);
      piece.changePosition(originalPos);
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
   console.log(bestMove,maxValue);
      debugger
    // if (isMaximizingPlayer) {
    //   return [bestMove, maxValue];
    // } else {
    //   return [bestMove, minValue];
    // }
  }
  function evaluateBoard(game,capturedPieces,move) {
    let prevSum = 0;
    if (game.king_dead()) {
  
      // Opponent is in checkmate (good for us)
      if (piece.color === game.turn) {
        return 10 ** 10;
      }
      // Our king's in checkmate (bad for us)
      else {
        return -(10 ** 10);
      }
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
    
  
    // var from = [
    //   8 - parseInt(move.from[1]),
    //   move.from.charCodeAt(0) - 'a'.charCodeAt(0),
    // ];
    // var to = [
    //   8 - parseInt(move.to[1]),
    //   move.to.charCodeAt(0) - 'a'.charCodeAt(0),
    // ];
  
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
  
    // if ('captured' in move) {
    //   // Opponent piece was captured (good for us)
    //   if (move.color === color) {
    //     prevSum +=
    //       weights[move.captured] +
    //       pstOpponent[move.color][move.captured][to[0]][to[1]];
    //   }
    //   // Our piece was captured (bad for us)
    //   else {
    //     prevSum -=
    //       weights[move.captured] +
    //       pstSelf[move.color][move.captured][to[0]][to[1]];
    //   }
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
  
    // if (move.flags.includes('p')) {
    //   // NOTE: promote to queen for simplicity
    //   move.promotion = 'q';
  
    //   // Our piece was promoted (good for us)
    //   if (move.color === color) {
    //     prevSum -=
    //       weights[move.piece] + pstSelf[move.color][move.piece][from[0]][from[1]];
    //     prevSum +=
    //       weights[move.promotion] +
    //       pstSelf[move.color][move.promotion][to[0]][to[1]];
    //   }
    //   // Opponent piece was promoted (bad for us)
    //   else {
    //     prevSum +=
    //       weights[move.piece] + pstSelf[move.color][move.piece][from[0]][from[1]];
    //     prevSum -=
    //       weights[move.promotion] +
    //       pstSelf[move.color][move.promotion][to[0]][to[1]];
    //   }
    // } else {
    //   // The moved piece still exists on the updated board, so we only need to update the position value
    //   if (move.color !== color) {
    //     prevSum += pstSelf[move.color][move.piece][from[0]][from[1]];
    //     prevSum -= pstSelf[move.color][move.piece][to[0]][to[1]];
    //   } else {
    //     prevSum -= pstSelf[move.color][move.piece][from[0]][from[1]];
    //     prevSum += pstSelf[move.color][move.piece][to[0]][to[1]];
    //   }
    // }
  
    return prevSum;
  }
   /* returns a value based on the future of a board */
//    function minimax (depth, chess, isMaximisingPlayer, max, min) {
//     if (depth === 0) {
//       return evaluateBoard(chess);
//     }
//     var newGameMoves = chess.ugly_moves();
//     if (isMaximisingPlayer) {
//       let bestMove = -9999;
//       maximizeLoop:
//       for (var i = 0; i < newGameMoves.length; i++) {
//           chess.ugly_move(newGameMoves[i]);
//           bestMove = Math.max(bestMove, minimax(depth - 1, chess, !isMaximisingPlayer, max, min));
//           max = Math.max(max, bestMove);
//           chess.ugly_undo();
//           if (max >= min) {
//               //console.log('Broke out of loop');
//               break maximizeLoop;
//           }
//       }
//       return bestMove;
//     }
//     else {
//       let bestMove = 9999;
//       minimizeLoop:
//       for (var i = 0; i < newGameMoves.length; i++) {
//           chess.ugly_move(newGameMoves[i]);
//           bestMove = Math.min(bestMove, minimax(depth - 1, chess, !isMaximisingPlayer, max, min));
//           min = Math.min(min, bestMove);
//           chess.ugly_undo();
//           if (min <= max) {
//               //console.log('Broke out of loop');
//               break minimizeLoop
//           }
//       }
//       return bestMove;
//     }
//   };
  
//   function evaluateBoard(chess) {
//       EVALUATIONS++
//       if (chess.in_checkmate()) {
//           if (chess.turn() === 'b') {
//               return 9999
//           }
//           else {
//               return -9999
//           }
//       } 
//       //console.log(chess.ascii());
//       const pieceValues = {
//         'b': {
//           'b': 3,
//           'k': 10,
//           'n': 3,
//           'p': 1,
//           'q': 10,
//           'r': 5,
//         },
//         'w': {
//           'b': -3,
//           'k': -10,
//           'n': -3,
//           'p': -1,
//           'q': -10,
//           'r': -5,
//         }
//       }
//       let pieceScore = 0;
//       let piece;
      
//       for (let square of chess.SQUARES) {
//           piece = chess.get(square);
//           if (piece) {
//               pieceScore += pieceValues[piece.color][piece.type];
//           }
//       }
//       let score = pieceScore;
//       //console.log(score);
//       return score;
//   }
//   function findBestMove(depth, chess, isMaximisingPlayer) {
//     let newGameMoves = chess.ugly_moves();
//     let bestMove = -9999;
//     let bestMoveFound;
//     const max = -9999;
//     const min = 9999;

//     for(var i = 0; i < newGameMoves.length; i++) {
//       let newGameMove = newGameMoves[i]
//       chess.ugly_move(newGameMove);
//       let value = minimax(depth - 1, chess, !isMaximisingPlayer, max, min);
//       chess.ugly_undo();
//       if(value >= bestMove) {
//           bestMove = value;
//           bestMoveFound = newGameMove;
//       }
//     }
//     return bestMoveFound;
//   };
//   function evaluateBoard(chess) {
//     EVALUATIONS++
//     if (chess.in_checkmate()) {
//         if (chess.turn() === 'b') {
//             return 9999
//         }
//         else {
//             return -9999
//         }
//     } 
//     //console.log(chess.ascii());
//     const pieceValues = {
//       'b': {
//         'b': 3,
//         'k': 10,
//         'n': 3,
//         'p': 1,
//         'q': 10,
//         'r': 5,
//       },
//       'w': {
//         'b': -3,
//         'k': -10,
//         'n': -3,
//         'p': -1,
//         'q': -10,
//         'r': -5,
//       }
//     }
//     let pieceScore = 0;
//     let piece;
    
//     for (let square of chess.SQUARES) {
//         piece = chess.get(square);
//         if (piece) {
//             pieceScore += pieceValues[piece.color][piece.type];
//         }
//     }
//     let score = pieceScore;
//     //console.log(score);
//     return score;
// }