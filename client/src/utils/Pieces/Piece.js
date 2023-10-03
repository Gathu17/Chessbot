export default class Piece {
	constructor(position, rank, name) {
		this.position = position;
		this.rank     = rank;
		this.name     = name;
		this.color    = this.name.substring(0,5);
	}


	hasRank(rank) {
		return this.rank == rank;
	}

	changePosition(position) {
		this.position = position;
	}

	getAllowedMoves() {
		return [];
	}

	getMovesTop() {
		const movesTop = [];
		const col = this.position.charAt(1);
        const row = parseInt(this.position.charAt(0));
		for (let move = row + 1; move <= 8; move++) {
			movesTop.push(`${move}${col}`);
		}
		return movesTop;
	}

	getMovesBottom() {
		const movesBottom = [];
		const col = this.position.charAt(1);
        const row = parseInt(this.position.charAt(0));
		for (let move = row - 1; move >= 1; move--) {
			movesBottom.push(`${move}${col}`);
		}
		return movesBottom;
	}

	getMovesRight() {
		const movesRight = []; 
		const col = this.position.charCodeAt(1) - 97;
        const row = parseInt(this.position.charAt(0));
		for (let move = col + 1; move < 8; move++){
			let colStr = String.fromCharCode(move + 97);
			movesRight.push(`${row}${colStr}`)
		}
		return movesRight;
	}

	getMovesLeft() {
		const movesLeft = [];
		const col = this.position.charCodeAt(1) - 97;
        const row = parseInt(this.position.charAt(0));
		for (let move = col - 1; move >= 0; move--){
			let colStr = String.fromCharCode(move + 97);
			movesLeft.push(`${row}${colStr}`)
		}
		return movesLeft;
	}

	getMovesTopRight() {
		const movesTopRight = [];
		let row = parseInt(this.position.charAt(0));
		let col = this.position.charCodeAt(1) - 97;

		while (row < 8 && col < 7) {
			row++;
			col++;
			const colStr = String.fromCharCode(col + 97);
			movesTopRight.push(`${row}${colStr}`);
		}
		return movesTopRight;
	}

	getMovesTopLeft() {
		const movesTopLeft = [];
		let row = parseInt(this.position.charAt(0));
		let col = this.position.charCodeAt(1) - 97;

		while (row < 8 && col > 0) {
			row++;
			col--;
			const colStr = String.fromCharCode(col + 97);
			movesTopLeft.push(`${row}${colStr}`);
		}
		return movesTopLeft;
	}

	getMovesBottomRight() {
		const movesBottomRight = [];
		let row = parseInt(this.position.charAt(0));
		let col = this.position.charCodeAt(1) - 97;

		while (row > 1 && col < 7) {
			row--;
			col++;
			const colStr = String.fromCharCode(col + 97);
			movesBottomRight.push(`${row}${colStr}`);
		}
		return movesBottomRight;
	}

	getMovesBottomLeft() {
		const movesBottomLeft = [];
		let row = parseInt(this.position.charAt(0));
		let col = this.position.charCodeAt(1) - 97;

		while (row > 1 && col > 0) {
			row--;
			col--;
			const colStr = String.fromCharCode(col + 97);
			movesBottomLeft.push(`${row}${colStr}`);
		}
		return movesBottomLeft;
	}
}