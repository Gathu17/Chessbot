// Zobrist hash
export function generateGameHash(pieces){
    let zobristHash = 0;

    const zobristTable = new Array(8).fill(0).map(() =>
    new Array(8).fill(0).map(() => new Array(6).fill(0).map(() => new Array(2).fill(0).map(() => Math.floor(Math.random() * 1e12))))
    );
    for(let piece of pieces){
        const col = piece.position.charCodeAt(1) - 97;
        const row = Number(piece.position[0]) - 1;
        // zobristHash ^= zobristTable[row][col][piece];
        const pieceTypeIndex = pieceTypeIndices[piece.rank];
        const colorIndex = piece.color === 'white' ? 0 : 1;
        
        zobristHash ^= zobristTable[row][col][pieceTypeIndex][colorIndex];


    }
    return zobristHash;
}
const pieceTypeIndices = {
    'pawn': 0,
    'rook': 1,
    'knight': 2,
    'bishop': 3,
    'queen': 4,
    'king': 5,
  };
