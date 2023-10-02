export function isValidMove(piece, startX, startY, endX, endY) {
    // Implement movement validation logic for each piece type
    switch (piece) {
      case "♜": // Rook
        return startX === endX || startY === endY;
  
      case "♞": // Knight
        // Knight moves in an L-shape
        return (Math.abs(startX - endX) === 2 && Math.abs(startY - endY) === 1) ||
               (Math.abs(startX - endX) === 1 && Math.abs(startY - endY) === 2);
  
      case "♝": // Bishop
        // Bishop moves diagonally
        return Math.abs(startX - endX) === Math.abs(startY - endY);
  
      case "♛": // Queen
        return startX === endX || startY === endY || Math.abs(startX - endX) === Math.abs(startY - endY);
  
      case "♚": // King
        return Math.abs(startX - endX) <= 1 && Math.abs(startY - endY) <= 1;
  
      case "♟": // Pawn
        // Pawn moves forward one square (or two squares from starting position)
        // Captures diagonally
        return (startX === endX && Math.abs(startY - endY) === 1) ||
               (startX === 1 && Math.abs(startX - endX) === 2 && startY === endY) ||
               (Math.abs(startX - endX) === 1 && Math.abs(startY - endY) === 1);
  
      default:
        return false; // Invalid piece
    }
  }