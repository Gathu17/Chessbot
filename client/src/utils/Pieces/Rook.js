import Piece from './Piece'

export default class Rook extends Piece {
	constructor(position, name, icon) {
		super(position, 'rook', name);
		this.ableToCastle = true;
        this.icon = icon
	}

	changePosition(position) {
		this.position = parseInt(position);
		this.ableToCastle = false;
	}

	getAllowedMoves() {
		return [ this.getMovesTop(), this.getMovesBottom(), this.getMovesRight(), this.getMovesLeft() ];
	}
}