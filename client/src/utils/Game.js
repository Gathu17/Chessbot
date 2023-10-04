import Queen from './Pieces/Queen'

export default class Game {
	constructor(pieces, turnPlaying) {
		this.pieces  = pieces;
		this.turn    = turnPlaying;
		this.clickedPiece = null;
		this._events = {
			pieceMove: [],
			kill: [],
			check: [],
			promotion: [],
			checkMate: [],
			turnChange: []
		}
	}

	clearEvents() {
		this._events = {};
	}

	on (eventName, callback) {
		if (this._events[eventName] && typeof callback === 'function') {
			this._events[eventName].push(callback);
		}
	}

	changeTurn() {
		if (this.turn === 'white') this.turn = 'black';
    else this.turn = 'white'
		this.triggerEvent('turnChange', this.turn);
	}

	getPiecesByColor(color) {
		return this.pieces.filter(obj => {
		return obj.color === color
		});
	}

	getPlayerPositions(color){
		const pieces = this.getPiecesByColor(color);
		return pieces.map( a => a.position);
	}

	filterPositions(positions) {
        
		return positions?.filter(pos => {
			if (typeof pos === 'string') {
                return pos[0] >= 1 && pos[0] <= 8 && pos[1].toLowerCase() >= 'a' && pos[1].toLowerCase() <= 'h';
            }
          });
	}

	unblockedPositions(piece, allowedPositions, checking=true) {
		const unblocked = [];
        let myBlockedPositions;
        let otherBlockedPositions;
        
		if (piece.color === 'white') {
			myBlockedPositions    = this.getPlayerPositions('white');
			otherBlockedPositions = this.getPlayerPositions('black');
		}
		else{
			myBlockedPositions    = this.getPlayerPositions('black');
			otherBlockedPositions = this.getPlayerPositions('white');
		}
		if (piece.hasRank('pawn')) {
			for (const move of allowedPositions[0]) { //attacking moves
				if (checking && this.myKingChecked(move)) continue;
			        if (otherBlockedPositions.indexOf(move) !== -1) continue; 
                    unblocked.push(move);
			}
			const blockedPositions = [...myBlockedPositions, ...otherBlockedPositions];

			for (const move of allowedPositions[1]) { //moving moves
				//console.log(this.myKingChecked(move, false));
				if (blockedPositions.indexOf(move) !== -1) {
					continue;
				}
				else if (checking && this.myKingChecked(move, false)) continue;
				unblocked.push(move);
			}
		} 
		else if(piece.hasRank('knight')) {
			for (let i = 0; i < allowedPositions?.length; i++) {
				if (myBlockedPositions.indexOf(allowedPositions[i]) !== -1) {
					continue;
				}  
				unblocked.push(allowedPositions[i]);
			}
		}
		else{
			console.log(otherBlockedPositions);
             for (let i = 0; i < allowedPositions?.length; i++) {
  
				for (let j = 0; j < allowedPositions[i].length; j++) {
					if (myBlockedPositions.indexOf(allowedPositions[i][j]) !== -1) {
						continue;
			       } 
					else if ( checking && this.myKingChecked(allowedPositions[i][j]) ) {
						if (otherBlockedPositions.indexOf(allowedPositions[i][j]) !== -1) {
							break;
						}
						continue;
						} 
						unblocked.push(allowedPositions[i][j]);
				}                     
                
                   
            }   
		}
		return unblocked && unblocked.length ? this.filterPositions(unblocked) : unblocked;
	}

	getPieceAllowedMoves(pieceName){
		const piece = this.getPieceByPos(pieceName);

		if(this.turn === piece?.color){
			this.setClickedPiece(piece);
			let pieceAllowedMoves = piece.getAllowedMoves();

			if (piece.hasRank('king')) {
				pieceAllowedMoves = this.getCastlingSquares(piece, pieceAllowedMoves);
			}

			return this.unblockedPositions(piece, pieceAllowedMoves, true);
		}
		else{
			return [];
		}
	}


	getCastlingSquares(king, allowedMoves) {
		console.log(this.king_checked(this.turn, king));
		if ( !king.ableToCastle || this.king_checked(this.turn, king) ) return allowedMoves;
		const rook1 = this.getPieceByName(this.turn+'Rook1');
		const rook2 = this.getPieceByName(this.turn+'Rook2');
		console.log(allowedMoves);
		if (rook1 && rook1.ableToCastle) {
			const col = rook1.position.charCodeAt(1) - 95
			const castlingPosition = `${rook1.position.charAt(0)}${String.fromCharCode(col + 97)}`;
			const castlingPosition1 = `${rook1.position.charAt(0)}${String.fromCharCode(col + 98)}`;
			const castlingPosition2 = `${rook1.position.charAt(0)}${String.fromCharCode(col + 96)}`;
            
            if(
                !this.positionHasExistingPiece(castlingPosition2) &&
                !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true) &&
                !this.positionHasExistingPiece(castlingPosition1) && !this.myKingChecked(castlingPosition1, true)
            )
			allowedMoves[0].push(castlingPosition);
		}
		if (rook2 && rook2.ableToCastle) {
			const col = rook1.position.charCodeAt(1) - 96
			const castlingPosition = `${rook1.position.charAt(0)}${String.fromCharCode(col + 97)}`;
			const castlingPosition1 = `${rook1.position.charAt(0)}${String.fromCharCode(col + 96)}`;
            
			if(
                !this.positionHasExistingPiece(castlingPosition1) && !this.myKingChecked(castlingPosition1, true) &&
                !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true)
            )
			allowedMoves[0].push(castlingPosition);
		}
		return allowedMoves;
	}

	getPieceByName(piecename) {
		return this.pieces.filter( obj => obj.name === piecename )[0];
	}

	getPieceByPos(piecePosition) {
		return this.pieces.filter(obj =>  {return obj.position == piecePosition} )[0];
	}

	positionHasExistingPiece(position) {
		console.log(position);
		return this.getPieceByPos(position) !== undefined;
	}

	setClickedPiece(piece) {
		this.clickedPiece = piece;
	}

	triggerEvent(eventName, params) {
		
		if (this._events[eventName]) {

			for (const cb of this._events[eventName]) {
				cb(params);
			}
		}
	}

	movePiece(pieceName, position) {
		console.log(position);
		const piece = this.getPieceByPos(pieceName);
		const prevPosition = piece?.position;
		console.log(this.getPieceAllowedMoves(piece?.position));
		if (piece && this.getPieceAllowedMoves(piece?.position).indexOf(position) !== -1) {
			
			const existedPiece = this.getPieceByPos(position)
            console.log(existedPiece,position);
			if (existedPiece) {
				this.kill(existedPiece);
			}

			if (!existedPiece && piece.hasRank('king') && piece.ableToCastle === true) {
				if (position - prevPosition === 2) {
					this.castleRook(piece.color + 'Rook2');
				}
				else if (position - prevPosition === -2) {
					this.castleRook(piece.color + 'Rook1');
				}
				piece.changePosition(position, true);
			}
			else {
				piece.changePosition(position);
			}
                  
			this.triggerEvent('pieceMove', piece);

			if (piece.rank === 'pawn' && (position.includes('8') || position.includes('1'))) {
				this.promote(piece);
			}

			this.changeTurn();

			if (this.king_checked(this.turn)) {
				this.triggerEvent('check', this.turn);

				if (this.king_dead(this.turn)) {
					this.checkmate(piece.color);
				}
				else{
					// alert('check');
				}
			}

			return true;
		}
		else{
			return false;
		}
	}

	kill(piece) {
		this.pieces.splice(this.pieces.indexOf(piece), 1);
		this.triggerEvent('kill', piece);
	}

	castleRook(rookName) {
		const rook = this.getPieceByName(rookName);
		const newPosition = rookName.indexOf('Rook2') !== -1 ? rook.position - 2 : rook.position + 3;

		this.setClickedPiece(rook);

		this.movePiece(rookName, newPosition);
		this.triggerEvent('pieceMove', rook);
		this.changeTurn();
	}

	promote(pawn) {
		const queenName = pawn.name.replace('Pawn', 'Queen');
		this.pieces.splice(this.pieces.indexOf(pawn), 1);
		const queen = new Queen(pawn.position, queenName);
		this.pieces.push(queen);
		this.triggerEvent('promotion', queen);
	}

	myKingChecked(pos, kill=true){
		console.log(pos);
		const piece = this.clickedPiece;
		const originalPosition = piece.position;
		console.log(originalPosition);
		const otherPiece = this.getPieceByPos(pos);
		const should_kill_other_piece = kill && otherPiece && otherPiece.rank !== 'king';
		
		console.log(should_kill_other_piece);
		if (should_kill_other_piece) this.pieces.splice(this.pieces.indexOf(otherPiece), 1);
		piece.changePosition(pos);
		
		if (this.king_checked(piece.color)) {
			console.log('king ako check');
			piece.changePosition(originalPosition);
			if (should_kill_other_piece) {
				this.pieces.push(otherPiece);
			}
			return 1;
		}
		else{
			piece.changePosition(originalPosition);
			if (should_kill_other_piece) this.pieces.push(otherPiece);
			return 0;
		}
	}

	king_dead(color) {
		const pieces = this.getPiecesByColor(color);
		for (const piece of pieces) {
			this.setClickedPiece(piece);
			const allowedMoves = this.unblockedPositions(piece, piece.getAllowedMoves(), true);
			if (allowedMoves.length) {
				this.setClickedPiece(null);
				return 0;
			}
		}
		this.setClickedPiece(null);
		return 1;
	}

	king_checked(color) {
		const piece = this.clickedPiece;
		const king = this.getPieceByName(color + 'King');
		const enemyColor = (color === 'white') ? 'black' : 'white';
		const enemyPieces = this.getPiecesByColor(enemyColor);
		
		for (const enemyPiece of enemyPieces) {
			this.setClickedPiece(enemyPiece);
			
			const allowedMoves = this.unblockedPositions(enemyPiece, enemyPiece.getAllowedMoves(), false);
			if(enemyPiece.rank == 'bishop') console.log(allowedMoves);
			
			if (allowedMoves.indexOf(king.position) !== -1) {
				let enemyPos = enemyPiece.position;
				let enemyCol = enemyPiece.position.charCodeAt(1) - 97;
				let enemyRow = parseInt(enemyPiece.position.charAt(0));
				const destCol = king.position.charCodeAt(1) - 97;
				const destRow = parseInt(king.position.charAt(0));
				
                while (enemyPos !== king.position) {
					// Move to the next square
					if(destCol < enemyCol) enemyCol--; 
					if(destRow < enemyRow) enemyRow--;
					if(destCol > enemyCol) enemyCol++;
					if(destRow > enemyRow) enemyRow++;

					enemyPos = enemyRow.toString() + String.fromCharCode(enemyCol + 97);
					
					if (this.getPieceByPos(enemyPos) && enemyPos !== king.position) {
						// Obstruction found, cannot move
						return 0;
					}				
					
				}

				this.setClickedPiece(piece);
				return 1;
			}
		}
		this.setClickedPiece(piece);
		return 0;
	}

	checkmate(color){
		this.triggerEvent('checkMate', color);
		this.clearEvents();
	}
}