import Piece from './Piece'

export default class King extends Piece {
	constructor(position, name,icon) {
		super(position, 'king', name);
		this.ableToCastle = true;
        this.icon = icon
	}


	getAllowedMoves() {
		const col = this.position.charCodeAt(1) - 97;
        const row = parseInt(this.position.charAt(0));
		const allowedMoves = [];

		// Horizontal and vertical moves
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue; // Skip the current position

				const newRow = row + i;
				const newCol = col + j;

				// Check if the new position is within the board boundaries
				if (newRow >= 1 && newRow <= 8 && newCol >= 0 && newCol <= 7) {
				allowedMoves.push(newRow + String.fromCharCode(newCol + 97));
				}
			}
		}
		return [
			allowedMoves
		];
	}

	changePosition(position, castle=false) {
		if (castle) {
			this.ableToCastle = false;
		}
		this.position = parseInt(position);
	}
}