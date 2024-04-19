import Piece from './Piece'

export default class Queen extends Piece {
	constructor(position, name, icon) {
		super(position, 'queen', name);
        this.icon = icon
		this.weight = 90
	}

	getAllowedMoves(){
		return [
			this.getMovesTop(),
			this.getMovesTopRight(),
			this.getMovesTopLeft(),
			this.getMovesBottom(),
			this.getMovesBottomRight(),
			this.getMovesBottomLeft(),
			this.getMovesRight(),
			this.getMovesLeft()
		];
	}
}