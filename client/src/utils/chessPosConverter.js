export function positionToChessNotation(position) {
    const row = Math.floor(position / 10);
    const col = String.fromCharCode((position % 10) + 97);
    return `${row}${col}`;
  }
  