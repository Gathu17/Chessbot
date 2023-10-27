import Queen from './Pieces/Queen'
import minimax  from './bot'
import { pieceValues } from './bot';
import { generateGameHash } from './hash';

export default class Game {
	constructor(pieces, turnPlaying,bot,boardMoves) {
		this.pieces  = pieces;
		this.turn    = turnPlaying;
		this.clickedPiece = null;
		this.saveKingMoves = [];
		this.checked = '';
		this.bot = bot;
		this.botPiece = null;
		this.transpositionTable = new Map();
		this.boardMoves = boardMoves;
		this._events = {
			pieceMove: [],
			kill: [],
			check: [],
			promotion: [],
			checkMate: [],
			turnChange: [],
			staleMate: []
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

	filterPositions(positions,piece) {
        
		const filteredPositions =  positions?.filter(pos => {
			if (typeof pos === 'string') {
                return pos[0] >= 1 && pos[0] <= 8 && pos[1].toLowerCase() >= 'a' && pos[1].toLowerCase() <= 'h';
            }
          });

		return filteredPositions;  
	}

	unblockedPositions(piece, allowedPositions, checking=true) {
		const unblocked = [];
        let myBlockedPositions;
        let otherBlockedPositions;
		const piecePos = piece.position.charCodeAt(1) -97
        
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
				    let row = Number(move[0])
					let otherPiece = this.getPieceByPos(`${row == 3 ? '4' : '5'}${move[1]}`)
					
			        if (otherBlockedPositions.indexOf(move) == -1) {
                        if(otherPiece && otherPiece.color !== piece.color && otherPiece.enPassant){
							unblocked.push(move);
						}
						continue
					}
					else if (checking && this.myKingChecked(move)) continue; 
                    unblocked.push(move);
			}
			const blockedPositions = [...myBlockedPositions, ...otherBlockedPositions];
			for (const move of allowedPositions[1]) { //moving moves
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
				else if (checking && this.myKingChecked(allowedPositions[i])) continue;  
				unblocked.push(allowedPositions[i]);
				
			}
		}
		else{
             for (let i = 0; i < allowedPositions?.length; i++) {
              if(allowedPositions[i] && allowedPositions[i].length){
				for (let j = 0; j < allowedPositions[i].length; j++) {
					if (myBlockedPositions.indexOf(allowedPositions[i][j]) !== -1) {
                        if (piece.name.includes('King')) continue;
						break;
			       } 
                   else if (otherBlockedPositions.indexOf(allowedPositions[i][j - 1]) !== -1) {
                        if (piece.name.includes('King')) continue;
                        break;
                   }
					else if ( checking && this.myKingChecked(allowedPositions[i][j]) ) {
						if (otherBlockedPositions.indexOf(allowedPositions[i][j - 1]) !== -1) {
							break;
						}
						continue;
						} 
						unblocked.push(allowedPositions[i][j]);
				}                     
			}   
                   
            }   
		}
		return unblocked && unblocked.length ? this.filterPositions(unblocked,piece) : unblocked;
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
		if ( !king.ableToCastle || this.king_checked(this.turn, king) ) return allowedMoves;
		const rook1 = this.getPieceByName(this.turn+'Rook1');
		const rook2 = this.getPieceByName(this.turn+'Rook2');

		if (rook1 && rook1.ableToCastle) {
            if (this.turn === 'white') {
                if (!this.getPieceByPos('1d') && 
                    !this.getPieceByPos('1c') && 
                    !this.getPieceByPos('1b')) {
                        allowedMoves[0].push('1c');
                }
            } else {
                if (!this.getPieceByPos('8d') && 
                    !this.getPieceByPos('8c') &&
                    !this.getPieceByPos('8b')) {
                        allowedMoves[0].push('8c');
                }
            }
		}
		if (rook2 && rook2.ableToCastle) {
            if (this.turn === 'white') {
                if (!this.getPieceByPos('1f') &&
                    !this.getPieceByPos('1g')) {
                        allowedMoves[0].push('1g');
                    }
            } else {
                if (!this.getPieceByPos('8f') && 
                    !this.getPieceByPos('8g')) {
                        allowedMoves[0].push('8g');

                    }
            }
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
		return this.getPieceByPos(position) !== undefined;
	}

	setClickedPiece(piece) {
		this.clickedPiece = piece;
	}

	setClickedBotPiece(piece){
		this.botPiece = piece;
	}

	triggerEvent(eventName, params) {
		
		if (this._events[eventName]) {

			for (const cb of this._events[eventName]) {
				cb(params);
			}
		}
	}

	movePiece(pieceName, position) {
		const piece = this.getPieceByPos(pieceName);
		let movesCount = Math.abs(Number(position[0]) - Number(pieceName[0]))
		const king = this.getPieceByName(piece?.color + 'King');

		const prevPosition = piece?.position;
		if(this.king_checked(piece?.color) && this.saveKingMoves.indexOf(position) == -1 && piece.rank !== 'king') {
			return false;
		}
		if (piece && this.getPieceAllowedMoves(piece?.position).indexOf(position) !== -1) {
			
			const existedPiece = this.getPieceByPos(position)
			let row = Number(position[0])
			const enemyPawn = this.getPieceByPos(`${row == 3 ? '4' : '5'}${position[1]}`)
			if (existedPiece) {
				this.kill(existedPiece);
			}else if(piece.hasRank('pawn') && enemyPawn && enemyPawn.enPassant){
				this.kill(enemyPawn);
			} 

			if (!existedPiece && piece.hasRank('king') && piece.ableToCastle === true) {
				if (position.charCodeAt(1) - prevPosition.charCodeAt(1) === 2) {
					this.castleRook(piece.color + 'Rook2');
				}
				else if (position.charCodeAt(1) - prevPosition.charCodeAt(1) === -2) {
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
			}else if(piece.rank == 'pawn' && movesCount < 2){
				piece.enPassant = false
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
			} else if(this.king_stalemate(this.turn)){
                 this.stalemate()
			}
            // this.in_three_fold_repetition()
			// console.log(this.boardMoves);
			// this.boardMoves = this.boardMoves + 1;
			console.log(this.boardMoves);
			return [prevPosition, position];
		}
		else{
			return [];
		}
	}

	kill(piece) {
		this.pieces.splice(this.pieces.indexOf(piece), 1);
		this.triggerEvent('kill', piece);
	}

	castleRook(rookName) {
		const rook = this.getPieceByName(rookName);
		const newPosition = rookName.indexOf('Rook2') !== -1 ? 
            rook.position[0] + String.fromCharCode(rook.position.charCodeAt(1) - 2) : 
            rook.position[0] + String.fromCharCode(rook.position.charCodeAt(1) + 3);

		this.setClickedPiece(rook);

		this.movePiece(rook.position, newPosition);
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
		const piece = this.clickedPiece;
		const originalPosition = piece.position;

		const otherPiece = this.getPieceByPos(pos);
		const should_kill_other_piece = kill && otherPiece && otherPiece.rank !== 'king';
		

		if (should_kill_other_piece) this.pieces.splice(this.pieces.indexOf(otherPiece), 1);
		piece.changePosition(pos);

		if (this.king_checked(piece.color)) {
           
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
		
		if(this.king_checked(color)){
			let isKingDead = true;
            for (const piece of pieces) {
				this.setClickedPiece(piece);
				const allowedMoves = this.unblockedPositions(piece, piece.getAllowedMoves(), true);
				allowedMoves.forEach((move)=>{
                   if(this.saveKingMoves.indexOf(move) !== -1){
					this.setClickedPiece(null);
					isKingDead = false;
				   } else if(piece.rank ==  'king'){
					this.setClickedPiece(null);
					isKingDead = false;
				   }
				})
			}
			this.setClickedPiece(null);
			return isKingDead;
		}
		return false;
	}

	king_checked(color) {
		const piece = this.clickedPiece;
		const king = this.getPieceByName(color + 'King');
		const enemyColor = (color === 'white') ? 'black' : 'white';
		const enemyPieces = this.getPiecesByColor(enemyColor);
		
		for (const enemyPiece of enemyPieces) {
			this.setClickedPiece(enemyPiece);
			
			const allowedMoves = this.unblockedPositions(enemyPiece, enemyPiece.getAllowedMoves(), false);
			
			if (allowedMoves.indexOf(king?.position) !== -1) {
				let enemyPos = enemyPiece.position;
				let enemyCol = enemyPiece.position.charCodeAt(1) - 97;
				let enemyRow = parseInt(enemyPiece.position.charAt(0));
				const destCol = king.position.charCodeAt(1) - 97;
				const destRow = parseInt(king.position.charAt(0));
				const saveKingMoves = [];
				this.checked = color;
				
                while (enemyPos !== king.position) {

					saveKingMoves.push(enemyPos);

					// Move to the next square
					if(destCol < enemyCol) enemyCol--; 
					if(destRow < enemyRow) enemyRow--;
					if(destCol > enemyCol) enemyCol++;
					if(destRow > enemyRow) enemyRow++;

					enemyPos = enemyRow.toString() + String.fromCharCode(enemyCol + 97);
                    
					const found = this.getPieceByPos(enemyPos)
					if (this.getPieceByPos(enemyPos) && enemyPos !== king.position) {
						// Obstruction found, cannot move

						return 0;
					}				
					
				}
				this.saveKingMoves = saveKingMoves;
				this.setClickedPiece(piece);
				return 1;
			}
		}
		this.setClickedPiece(piece);
		return 0;
	}
	getBestMove(color, level){
		// let botMoveValues = []
        var bestMove = minimax(
			this.bot,
			level,
			Number.NEGATIVE_INFINITY,
			Number.POSITIVE_INFINITY,
			true,
			color
      );
		return bestMove;
		
		
	}
	makeBestMove(color, setBlackCountdown, prevTime, level) {
		const [move,moveValue] = this.getBestMove(color, level)

    const currTime = Date.now();
    const timeDiff = currTime - prevTime;
    const factor = Math.ceil(timeDiff / 1000)

    if (factor >= 1) {
      setBlackCountdown((prevCountdown) => prevCountdown > 0 ? prevCountdown - factor : prevCountdown)
    }
  
		const pieceValue = pieceValues[move[3]][move[2]];
		const isNumeric = !isNaN(Number(move[4]));
		const pieceName = isNumeric ? pieceValue + move[4] : pieceValue;
		const piece = this.getPieceByName(pieceName)
		
		this.setClickedPiece(piece);
		const positionMoved = this.movePiece(piece.position,`${move[0]}${move[1]}`)
		return positionMoved;
		
	}
	getAllPiecesAllowedMoves(){
		let allowedMoves = [];
		this.pieces.forEach((piece)=>{
			this.setClickedPiece(piece)
			const nameSymbol = piece.name[5] == 'K' ? piece.rank == 'king' ? 'K' : 'N'  : piece.name[5]
			const moves = this.unblockedPositions(piece, piece.getAllowedMoves(), true).map((pos)=>{

				return pos += `${nameSymbol}${piece.color[0]}${piece.name[piece.name.length -1]}`
			})
           allowedMoves.push(...moves)
		})
		return allowedMoves;
	}
	getAllPiecesAllowedMovesByColor(color){
		let allowedMoves = [];
		const pieces = this.getPiecesByColor(color)
		pieces.forEach((piece)=>{
			this.setClickedPiece(piece)
			const nameSymbol = piece.name[5] == 'K' ? piece.rank == 'king' ? 'K' : 'N'  : piece.name[5]
			const moves = this.unblockedPositions(piece, piece.getAllowedMoves(), true).map((pos)=>{

				return pos += `${nameSymbol}${piece.color[0]}${piece.name[piece.name.length -1]}`
			})
           allowedMoves.push(...moves)
		})
		return allowedMoves;
	}
	king_stalemate(color){
			if(!this.getAllPiecesAllowedMovesByColor(color)[0]){
                return 1
			}
			return 0;	
	}

	checkmate(color){
		this.triggerEvent('checkMate', color);
		this.clearEvents();
	}
	stalemate(){
		this.triggerEvent('staleMate');
		this.clearEvents();
	}
	in_three_fold_repetition(){
		const gameHash = generateGameHash(this.pieces)
		console.log(gameHash);
	
	}
}