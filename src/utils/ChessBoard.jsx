import Bishop from './Pieces/Bishop'
import Pawn from './Pieces/Pawn'
import Queen from './Pieces/Queen'
import Rook from './Pieces/Rook'
import Knight from './Pieces/Knight'
import King from './Pieces/King'
// import Game from './Game'


const startBoard = game => {
    const board   = document.getElementById('board');

    const squares = board.querySelectorAll('.square');
    const whiteSematary = document.getElementById('whiteSematary');
    const blackSematary = document.getElementById('blackSematary');
    const turnSign = document.getElementById('turn');
    let clickedPieceName;

    const resetBoard = () => {
        for (const square of squares) {
            square.innerHTML = '';
        }

        for (const piece of game.pieces) {
            const square = document.getElementById(piece.position);

            square.innerHTML = piece.icon
        }
    }

    resetBoard();

    const setAllowedSquares = (pieceImg) => {
        clickedPieceName = pieceImg.id;
        const allowedMoves = game.getPieceAllowedMoves(clickedPieceName);
        if (allowedMoves) {
            const clickedSquare = pieceImg.parentNode;
            clickedSquare.classList.add('clicked-square');

            allowedMoves.forEach( allowedMove => {

                if (document.contains(document.getElementById(allowedMove))) {
                    document.getElementById(allowedMove).classList.add('allowed');
                }
            });
        }
        else{
            clearSquares();
        }
    }

    const clearSquares = () => {
        const allowedSquares = board.querySelectorAll('.allowed');
        allowedSquares.forEach( allowedSquare => allowedSquare.classList.remove('allowed') );
        const cllickedSquare = document.getElementsByClassName('clicked-square')[0];
        if (cllickedSquare) {
            cllickedSquare.classList.remove('clicked-square');
        }
    }

    function movePiece(square) {
        const position = square.getAttribute('id');
       
        const existedPiece = game.getPieceByPos(position);

        if (existedPiece && existedPiece.color === game.turn) {
            const pieceImg = document.getElementById(existedPiece.position);
            clearSquares();
           return setAllowedSquares(pieceImg);
        }

        game.movePiece(clickedPieceName, position);
    }

    squares.forEach( square => {
        square.addEventListener("click", function () {
            movePiece(this);
        });
        square.addEventListener("dragover", function(event){
            event.preventDefault();
        });
        square.addEventListener("drop", function () {
            movePiece(this);
        });
    });

    // pieces.forEach( piece => {
    //     const pieceImg = document.getElementById(piece.name);
    //     pieceImg.addEventListener("drop", function () {
    //         const square = document.getElementById(piece.position);
    //         movePiece(square);
    //     });
    // });

    document.querySelectorAll('img.piece').forEach( pieceImg => {
        pieceImg.addEventListener("dragstart", function(event) {
            event.stopPropagation();
            event.dataTransfer.setData("text", event.target.id);
            clearSquares();
            setAllowedSquares(event.target)
        });
        pieceImg.addEventListener("drop", function(event) {
            event.stopPropagation();
            clearSquares();
            setAllowedSquares(event.target)
        });
    });

    game.on('pieceMove', piece => {
        const square = document.getElementById(piece.position)
        square.append( document.getElementById(piece.name) );
        clearSquares();
    });

    game.on('turnChange', turn => {
        turnSign.innerHTML = turn === 'white' ? "White's Turn" : "Black's Turn";
    });

    game.on('promotion', queen => {
        const square = document.getElementById(queen.position);
        square.innerHTML = `<img class="piece queen" id="${queen.name}" src="img/${queen.color}Queen.png">`;
    })

    game.on('kill', piece => {
        const pieceImg = document.getElementById(piece.name);
        pieceImg.parentNode.removeChild(pieceImg);
        pieceImg.className = '';

        const sematary = piece.color === 'white' ? whiteSematary : blackSematary;
        sematary.querySelector('.'+piece.rank).append(pieceImg);
    });

    game.on('checkMate', color => {
        const endScene = document.getElementById('endscene');
        endScene.getElementsByClassName('winning-sign')[0].innerHTML = color + ' Wins';
        endScene.classList.add('show');
    })
}

export const pieces = [
    new Rook('1a', 'whiteRook1',"♖"),
    new Knight('1b', 'whiteKnight1', "♘"),
    new Bishop('1c', 'whiteBishop1', "♗"),
    new Queen('1d', 'whiteQueen', "♕"),
    new King('1e', 'whiteKing', "♔"),
    new Bishop('1f', 'whiteBishop2', "♗"),
    new Knight('1g', 'whiteKnight2', "♘"),
    new Rook('1h', 'whiteRook2', "♖"),
    new Pawn('2a', 'whitePawn1', "♙"),
    new Pawn('2b', 'whitePawn2', "♙"),
    new Pawn('2c', 'whitePawn3', "♙"),
    new Pawn('2d', 'whitePawn4', "♙"),
    new Pawn('2e', 'whitePawn5', "♙"),
    new Pawn('2f', 'whitePawn6', "♙"),
    new Pawn('2g', 'whitePawn7', "♙"),
    new Pawn('2h', 'whitePawn8', "♙"),

    new Pawn('7a', 'blackPawn1', "♟"),
    new Pawn('7b', 'blackPawn2', "♟"),
    new Pawn('7c', 'blackPawn3', "♟"),
    new Pawn('7d', 'blackPawn4', "♟"),
    new Pawn('7e', 'blackPawn5', "♟"),
    new Pawn('7f', 'blackPawn6', "♟"),
    new Pawn('7g', 'blackPawn7', "♟"),
    new Pawn('7h', 'blackPawn8', "♟"),
    new Rook('8a', 'blackRook1', "♜"),
    new Knight('8b', 'blackKnight1', "♞"),
    new Bishop('8c', 'blackBishop1', "♝"),
    new Queen('8d', 'blackQueen', "♛"),
    new King('8e', 'blackKing', "♚"),
    new Bishop('8f', 'blackBishop2', "♝"),
    new Knight('8g', 'blackKnight2', "♞"),
    new Rook('8h', 'blackRook2', "♜")
];

export default startBoard;