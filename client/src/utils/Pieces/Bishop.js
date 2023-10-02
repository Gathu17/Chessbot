import Piece from './Piece'

export default class Bishop extends Piece {
	constructor(position, name, icon) {
		super(position, 'bishop', name);
        this.icon = icon
	}

	getAllowedMoves() {
		return [ this.getMovesTopRight(), this.getMovesTopLeft(), this.getMovesBottomRight(), this.getMovesBottomLeft() ];
	}
}