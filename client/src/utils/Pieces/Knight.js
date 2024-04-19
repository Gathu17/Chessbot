import Piece from './Piece'

export default class Knight extends Piece {
	constructor(position, name, icon) {
		super(position, 'knight', name);
        this.icon = icon
        this.weight = 30
	}

	getAllowedMoves() {
		const position = this.position;

        const validMoves = [];
        const row = parseInt(position[0])
        const col = position.toLowerCase().charCodeAt(1)

        validMoves.push(`${row + 2}${String.fromCharCode(col + 1)}`)
        validMoves.push(`${row + 2}${String.fromCharCode(col - 1)}`)
        validMoves.push(`${row + 1}${String.fromCharCode(col + 2)}`)
        validMoves.push(`${row + 1}${String.fromCharCode(col - 2)}`)
        validMoves.push(`${row - 2}${String.fromCharCode(col + 1)}`)
        validMoves.push(`${row - 2}${String.fromCharCode(col - 1)}`)
        validMoves.push(`${row - 1}${String.fromCharCode(col + 2)}`)
        validMoves.push(`${row - 1}${String.fromCharCode(col - 2)}`)
    
        return validMoves.filter(item => {
            return parseInt(item[0]) >= 1 &&
                parseInt(item[0]) <= 8 &&
                item[1] >= 'a' &&
                item[1] <= 'h'
        })
	}
}