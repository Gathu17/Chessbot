import Piece from './Piece'

export default class Rook extends Piece {
	constructor(position, name, icon) {
		super(position, 'rook', name);
		this.ableToCastle = true;
        this.icon = icon
		this.weight = 5
	}

	changePosition(position) {
		this.position = position;
		// this.ableToCastle = false;
	}

	getAllowedMoves() {
		return [ this.getMovesTop(), this.getMovesBottom(), this.getMovesRight(), this.getMovesLeft() ];
	}
}