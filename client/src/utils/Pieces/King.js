import Piece from './Piece'

export default class King extends Piece {
	constructor(position, name,icon) {
		super(position, 'king', name);
		this.ableToCastle = true;
        this.icon = icon
	}


	getAllowedMoves() {
		const position = this.position;
		return [
			[parseInt(position) + 1],
			[parseInt(position) - 1],
			[parseInt(position) + 10],
			[parseInt(position) - 10],
			[parseInt(position) + 11],
			[parseInt(position) - 11],
			[parseInt(position) + 9],
			[parseInt(position) - 9]
		];
	}

	changePosition(position, castle=false) {
		if (castle) {
			this.ableToCastle = false;
		}
		this.position = parseInt(position);
	}
}