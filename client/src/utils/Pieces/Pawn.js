import Piece from './Piece'
import { positionToChessNotation } from '../chessPosConverter';

export default class Pawn extends Piece {
	constructor(position, name, icon) {
		super(position, 'pawn', name)
        this.icon = icon
        this.weight = 1
        this.enPassant = true;
	}

	getAllowedMoves() {
            const col = this.position.charCodeAt(1) - 97;
            const row = parseInt(this.position.charAt(0));
            const position = row * 10 + col;

            const mathSign = (this.color === 'white') ? 1 : -1;
            const allowedMoves = [position + mathSign * 10];

            if ((position > 19 && position < 28) || (position > 69 && position < 78)) {
                allowedMoves.push(position + mathSign * 20);
            }

            const attackMoves = [position + mathSign * 9, position + mathSign * 11];

            // Convert numerical positions to chess notation
            const convertedAttackMoves = attackMoves.map(pos => positionToChessNotation(pos));
            const convertedAllowedMoves = allowedMoves.map(pos => positionToChessNotation(pos));

            return [convertedAttackMoves, convertedAllowedMoves];
	}
}