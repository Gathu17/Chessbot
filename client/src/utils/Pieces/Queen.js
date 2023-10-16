import Piece from './Piece'

export default class Queen extends Piece {
	constructor(position, name, icon) {
		super(position, 'queen', name);
        this.icon = icon
		this.weight = 9
	}

	getAllowedMoves(){
		console.log(this.getMovesBottomRight());
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