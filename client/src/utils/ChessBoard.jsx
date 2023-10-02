import Bishop from './Pieces/Bishop'
import Pawn from './Pieces/Pawn'
import Queen from './Pieces/Queen'
import Rook from './Pieces/Rook'
import Knight from './Pieces/Knight'
import King from './Pieces/King'

export const pieces = [
  new Pawn('2a', 'whitePawn1', "♟"),
  new Pawn('2b', 'whitePawn2', "♟"),
  new Pawn('2c', 'whitePawn3', "♟"),
  new Pawn('2d', 'whitePawn4', "♟"),
  new Pawn('2e', 'whitePawn5', "♟"),
  new Pawn('2f', 'whitePawn6', "♟"),
  new Pawn('2g', 'whitePawn7', "♟"),
  new Pawn('2h', 'whitePawn8', "♟"),
  new Rook('1a', 'whiteRook1', "♜"),
  new Knight('1b', 'whiteKnight1', "♞"),
  new Bishop('1c', 'whiteBishop1', "♝"),
  new Queen('1d', 'whiteQueen', "♛"),
  new King('1e', 'whiteKing', "♚"),
  new Bishop('1f', 'whiteBishop2', "♝"),
  new Knight('1g', 'whiteKnight2', "♞"),
  new Rook('1h', 'whiteRook2', "♜"),

  new Rook('8a', 'blackRook1',"♖"),
  new Knight('8b', 'blackKnight1', "♘"),
  new Bishop('8c', 'blackBishop1', "♗"),
  new Queen('8d', 'blackQueen', "♕"),
  new King('8e', 'blackKing', "♔"),
  new Bishop('8f', 'blackBishop2', "♗"),
  new Knight('8g', 'blackKnight2', "♘"),
  new Rook('8h', 'blackRook2', "♖"),
  new Pawn('7a', 'blackPawn1', "♙"),
  new Pawn('7b', 'blackPawn2', "♙"),
  new Pawn('7c', 'blackPawn3', "♙"),
  new Pawn('7d', 'blackPawn4', "♙"),
  new Pawn('7e', 'blackPawn5', "♙"),
  new Pawn('7f', 'blackPawn6', "♙"),
  new Pawn('7g', 'blackPawn7', "♙"),
  new Pawn('7h', 'blackPawn8', "♙")
];
