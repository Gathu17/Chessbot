import Piece from './Piece'

export default class Knight extends Piece {
	constructor(position, name, icon) {
		super(position, 'knight', name);
        this.icon = icon
	}

	getAllowedMoves() {
		const position = this.position;
		return [
			[parseInt(position) + 21],
			[parseInt(position) - 21],
			[parseInt(position) + 19],
			[parseInt(position) - 19],
			[parseInt(position) + 12],
			[parseInt(position) - 12],
			[parseInt(position) + 8],
			[parseInt(position) - 8]
		];
	}
}