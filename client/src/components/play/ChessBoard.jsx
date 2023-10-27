import React, { useState, useRef } from "react";
import Bishop from "../../utils/Pieces/Bishop";
import Pawn from "../../utils/Pieces/Pawn";
import Queen from "../../utils/Pieces/Queen";
import Rook from "../../utils/Pieces/Rook";
import Knight from "../../utils/Pieces/Knight";
import King from "../../utils/Pieces/King";
import Game from "../../utils/Game";
import Square from "./Square";

const ChessBoard = ({
  turnPlaying,
  setTurnPlaying,
  turnLabel,
  winningSign,
  blackSematary,
  whiteSematary,
  whiteCountdown,
  blackCountdown,
  setBlackCountdown,
  setWhiteCountdown,
  level
}) => {
  const board = React.useRef(null);
  const squares = Array(64)
    .fill(null)
    .map(() => React.useRef(null));
  const [clickedPieceName, setClickedPieceName] = React.useState("");
  const [playBot, setPlayBot] = useState({state: true,color: 'black'})
  const [repSize, setRepSize] = useState(0);
  const [boardMoves, setBoardMoves] = useState(0)
  const [whiteRep, setWhiteRep] = useState({
    first: {
      go: [], 
      back: []
    }, 
    second: {
      go: [], 
      back: []
    }, 
    third: {
      go: [], 
      back: []
    }
  });
  const [blackRep, setBlackRep] = useState({
    first: {
      go: [], 
      back: []
    }, 
    second: {
      go: [], 
      back: []
    }, 
    third: {
      go: [], 
      back: []
    }
  });

  
  const game = new Game(pieces, turnPlaying,playBot,boardMoves);

  //   game status
  // status can be ongoing, white won, black won, draw, aborted
  const [gameStatus, setGameStatus] = useState("ongoing");

  React.useEffect(() => {
    const whiteTimer = setInterval(() => {
      if (turnPlaying === "white") {
        setWhiteCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : prevCountdown
        );

        // if white takes more than 15 seconds to make first move, abort game
        // if countdown gets to 0, end game and show lost to white, award black points
        if (whiteCountdown <= 0) {
          setGameStatus("black-won");
          // award black points
        }
      }

      if (blackCountdown <= 0) {
        setGameStatus("white-won");
        // award white points
      }
    }, 1000);

    return () => clearInterval(whiteTimer);
  }, [turnPlaying]);

  React.useEffect(() => {
    // const blackTimer = setInterval(() => {
    //   if (turnPlaying === "black") {
    //     setBlackCountdown((prevCountdown) =>
    //       prevCountdown > 0 ? prevCountdown - 1 : prevCountdown
    //     );

    //     if (blackCountdown <= 0) {
    //       setGameStatus("white-won");
    //       // award white points
    //     }
    //   }
    // }, 1000);

    // return () => clearInterval(blackTimer);
  }, [turnPlaying]);

  function handleSquareClick(e) {
    movePiece(e.target);
  }

  function resetWhiteRep() {
    setWhiteRep({
      first: {...whiteRep.second}, 
      second: {...whiteRep.third}, 
      third: {go: [], back: []}
    });
    setRepSize((prevSize) => prevSize > 1 ? prevSize - 1 : 0);
  }

  function resetBlackRep() {
    setBlackRep({
      first: {...blackRep.second}, 
      second: {...blackRep.third}, 
      third: {go: [], back: []}
    });
    setRepSize((prevSize) => prevSize > 1 ? prevSize - 1 : 0);
  }

  function checkRep() {
    const whiteVals = Object.values(whiteRep);
    const blackVals = Object.values(blackRep);

    for (let i = 0; i < whiteVals.length; i++) {
      if (whiteVals[i].go.length && whiteVals[i].back.length && blackVals[i].back.length && blackVals[i].go.length) {
        const whiteBack = whiteVals[i].back.join('')
        const whiteGo = whiteVals[i].go.join('')
        const whiteBackRev = whiteBack[2] + whiteBack[3] + whiteBack[0] + whiteBack[1]
        
        const blackBack = blackVals[i].back.join('')
        const blackGo = blackVals[i].go.join('')
        const blackBackRev = blackBack[2] + blackBack[3] + blackBack[0] + blackBack[1]

        if (whiteGo === whiteBackRev && blackGo === blackBackRev) {
          if (i === 0) continue;
          else {
            if (whiteGo === whiteVals[i - 1].go.join('') && 
              whiteBack === whiteVals[i - 1].back.join('') && 
              blackGo === blackVals[i - 1].go.join('') &&
              blackBack === blackVals[i - 1].back.join('')) {
                continue;
            } else {
              resetWhiteRep();
              resetBlackRep();
              return;
            }
          }
        }
        else {
          resetWhiteRep();
          resetBlackRep();
          return;
        }
      } else {
        return;
      }
    }

    // Logic for implementing a draw here
    console.log('Draw by 3 fold');
  }

  function checkPartialRep(go, back) {
    const valBack = back.join('')
    const valGo = go.join('')
    const valBackRev = valBack[2] + valBack[3] + valBack[0] + valBack[1]

    if (valGo === valBackRev) {
      return true;
    }
    else {
      return false;
    }
  }

  function updateRep(color, position) {
    if (color === 'black') {
      const blackVals = Object.values(blackRep);
      for (let i = 0; i < blackVals.length; i++) {
        const blackVal = blackVals[i];
        const current = verifyRepPosition(i);
        if (!blackVal.go.length) {
          setBlackRep({...blackRep, [current]: {...blackRep[current], go: position}});
          setRepSize((prevSize) => prevSize > 1 ? prevSize + 1 : 0);
          return;
        } else if (!blackVal.back.length) {
          const currentPiece = game.getPieceByPos(position[1]);
          const pieceGo = game.getPieceByPos(blackVal.go[1]) || game.getPieceByPos(blackVal.go[0]);
          
          if (currentPiece.name !== pieceGo.name) {
            resetWhiteRep();
            resetBlackRep();
            return;
          }
          
          const currentRepStatus = checkPartialRep(blackRep[current].go, position)
          if (currentRepStatus) {
            setBlackRep({...blackRep, [current]: {...blackRep[current], back: position}});
            setRepSize((prevSize) => prevSize > 1 ? prevSize + 1 : 0);
            if (i === 2) break;
            else return;
          }
          setBlackRep({...blackRep, [current]: {go: [], back: []}});
          setRepSize((prevSize) => prevSize > 1 ? prevSize - 1 : 0);
          
          return;
        }
        continue;
      }
  
    } else if (color === 'white') {
      const whiteVals = Object.values(whiteRep);
      for (let i = 0; i < whiteVals.length; i++) {
        const whiteVal = whiteVals[i];
        const current = verifyRepPosition(i);
        if (!whiteVal.go.length) {
          setWhiteRep({...whiteRep, [current]: {...whiteRep[current], go: position}});
          return;
        } else if (!whiteVal.back.length) {
          const currentPiece = game.getPieceByPos(position[1]);
          const pieceGo = game.getPieceByPos(whiteVal.go[1]) || game.getPieceByPos(whiteVal.go[0]);
          
          if (currentPiece.name !== pieceGo.name) {
            resetWhiteRep();
            resetBlackRep();
            return;
          }

          const currentRepStatus = checkPartialRep(whiteRep[current].go, position)
          if (currentRepStatus) {
            setWhiteRep({...whiteRep, [current]: {...whiteRep[current], back: position}});
            if (i === 2) break;
            else return;
          }
          setWhiteRep({...whiteRep, [current]: {go: [], back: []}});
          return;
        }
        continue;
      }
    }

    checkRep();
  }

  function verifyRepPosition(pos) {
    if (pos === 2) return 'third';
    else if (pos === 1) return 'second';
    else return 'first';
  }

  const resetBoard = () => {
    for (const square of squares) {
      square.current.textContent = "";
    }

    for (const piece of game.pieces) {
      const square = squares.find(
        (elem) => elem.current.id === piece.position
      )?.current;
      if (square) square.textContent = piece.icon;
    }
  };
  function botPlay() {
    const positionMoved = [];
    const prevTime = Date.now();
    const times = [1000, 2000];
    const randTime = times[Math.floor(Math.random() * 2)]
    
    if (playBot.state && turnPlaying == playBot.color) {
      console.log("bot play");
      setTimeout(() => {
        positionMoved.push(...game.makeBestMove(playBot.color, setBlackCountdown, prevTime, level));
        updateRep('white', positionMoved);
      }, randTime);
    }
  }

  function alwaysSetAllowedSquares() {
    if (
      squares.filter((item) =>
        item.current.classList.contains("clicked-square")
      ).length
    ) {
      removeHighlightedSquares();
      setAllowedSquares(
        squares.find((item) =>
          item.current.classList.contains("clicked-square")
        ).current
      );
    }
  }

  React.useEffect(() => {
    resetBoard();
    botPlay()
    
  }, [turnPlaying]);

  React.useEffect(() => {
    alwaysSetAllowedSquares();
  }, [clickedPieceName]);

  function setAllowedSquares(pieceImg) {
    setClickedPieceName(pieceImg.id);
    const allowedMoves = game.getPieceAllowedMoves(
      clickedPieceName || pieceImg.id
    );

    if (allowedMoves) {
      const clickedSquare = pieceImg;

      clickedSquare.classList.add("clicked-square");

      allowedMoves.forEach((allowedMove) => {
        if (squares.find((item) => item.current.id === allowedMove).current) {
          squares
            .find((item) => item.current.id === allowedMove)
            .current.classList.add("allowed");
        }
      });
    } else {
      clearSquares();
    }
  }

  function removeHighlightedSquares() {
    const allowedSquares = squares.filter((item) =>
      item.current.classList.value.includes("allowed")
    );
    allowedSquares.forEach((allowedSquare) =>
      allowedSquare.current.classList.remove("allowed")
    );
  }

  const clearSquares = () => {
    removeHighlightedSquares();

    const cllickedSquare = squares.find((item) =>
      item.current.classList.value.includes("clicked-square")
    );
    if (cllickedSquare) {
      cllickedSquare.current.classList.remove("clicked-square");
    }
  };

  function movePiece(square) {
    const position = square.getAttribute("id");
    const existedPiece = game.getPieceByPos(position);
    const turn = turnPlaying;
    if (existedPiece && existedPiece.color === turnPlaying) {
      const pieceImg = squares.find(
        (item) => item.current.id === existedPiece.position
      ).current;
      clearSquares();
      return setAllowedSquares(pieceImg);
    }


    const positionMoved = game.movePiece(clickedPieceName, position, turnPlaying);
    updateRep(turn, positionMoved);
  }

  // squares.forEach( square => {
  //     square.addEventListener("click", function () {
  //         movePiece(this);
  //     });
  //     square.addEventListener("dragover", function(event){
  //         event.preventDefault();
  //     });
  //     square.addEventListener("drop", function () {
  //         movePiece(this);
  //     });
  // });

  // pieces.forEach( piece => {
  //     const pieceImg = document.getElementById(piece.name);
  //     pieceImg.addEventListener("drop", function () {
  //         const square = document.getElementById(piece.position);
  //         movePiece(square);
  //     });
  // });

  document.querySelectorAll("img.piece").forEach((pieceImg) => {
    pieceImg.addEventListener("dragstart", function (event) {
      event.stopPropagation();
      event.dataTransfer.setData("text", event.target.id);
      clearSquares();
      setAllowedSquares(event.target);
    });
    pieceImg.addEventListener("drop", function (event) {
      event.stopPropagation();
      clearSquares();
      setAllowedSquares(event.target);
    });
  });


  game.on("pieceMove", (piece) => {
    const square = squares.find(
      (elem) => elem.current.id === piece.position
    ).current;
    square.textContent = piece.icon;
    clearSquares();
    setBoardMoves(boardMoves + 1)
  });

  game.on("turnChange", (turn) => {
    if (!game.king_checked(turn)) {
      turnLabel.current.textContent =
        turnPlaying === "white" ? "Black's Turn" : "White's Turn";
      setTurnPlaying(turnPlaying === "white" ? "black" : "white");
    } else {
      turnLabel.current.textContent =
        turn === "white" ? "White Checked" : "Black Checked";
      setTurnPlaying(turnPlaying === "white" ? "black" : "white");
    }
  });

  game.on("promotion", (queen) => {
    const square = squares.find(
      (elem) => elem.current.id === queen.position
    ).current;
    const queenChar = pieces.find(
      (elem) => elem.color === queen.color && elem.rank === "queen"
    );
    // square.textContent = `<img class="piece queen" id="${queen.name}" src="img/${queen.color}Queen.png">`;
    queen.icon = queenChar.icon;
    square.textContent = queenChar.icon;
  });

  game.on("kill", (piece) => {
    const sematary =
      piece.color === "white" ? whiteSematary.current : blackSematary.current;
    sematary.querySelector("." + piece.rank).append(piece.icon);
  });

  game.on("checkMate", (color) => {
    winningSign.current.textContent = color + " Wins";
  });

  game.on("staleMate", () => {
    winningSign.current.textContent = "Stalemate"
  })
  return (
    <>
      <table ref={board} id="board" className="w-[400px] ">
        <tbody>
          {[...Array(8).keys()].map((_, row) => (
            <tr key={row}>
              {[...Array(8).keys()].map((_, col) => {
                const squareId = `${8 - row}${String.fromCharCode(97 + col)}`;
                const isEvenSquare = (row + col) % 2 === 0;
                return (
                  <Square
                    squareId={squareId}
                    isEvenSquare={isEvenSquare}
                    row={row}
                    col={col}
                    squareRef={squares[row * 8 + col]}
                    key={squareId}
                    handleClick={handleSquareClick}
                    game={game}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const pieces = [
  new Rook("1a", "whiteRook1", "♖"),
  new Knight("1b", "whiteKnight1", "♘"),
  new Bishop("1c", "whiteBishop1", "♗"),
  new Queen("1d", "whiteQueen", "♕"),
  new King("1e", "whiteKing", "♔"),
  new Bishop("1f", "whiteBishop2", "♗"),
  new Knight("1g", "whiteKnight2", "♘"),
  new Rook("1h", "whiteRook2", "♖"),
  new Pawn("2a", "whitePawn1", "♙"),
  new Pawn("2b", "whitePawn2", "♙"),
  new Pawn("2c", "whitePawn3", "♙"),
  new Pawn("2d", "whitePawn4", "♙"),
  new Pawn("2e", "whitePawn5", "♙"),
  new Pawn("2f", "whitePawn6", "♙"),
  new Pawn("2g", "whitePawn7", "♙"),
  new Pawn("2h", "whitePawn8", "♙"),

  new Pawn("7a", "blackPawn1", "♟"),
  new Pawn("7b", "blackPawn2", "♟"),
  new Pawn("7c", "blackPawn3", "♟"),
  new Pawn("7d", "blackPawn4", "♟"),
  new Pawn("7e", "blackPawn5", "♟"),
  new Pawn("7f", "blackPawn6", "♟"),
  new Pawn("7g", "blackPawn7", "♟"),
  new Pawn("7h", "blackPawn8", "♟"),
  new Rook("8a", "blackRook1", "♜"),
  new Knight("8b", "blackKnight1", "♞"),
  new Bishop("8c", "blackBishop1", "♝"),
  new Queen("8d", "blackQueen", "♛"),
  new King("8e", "blackKing", "♚"),
  new Bishop("8f", "blackBishop2", "♝"),
  new Knight("8g", "blackKnight2", "♞"),
  new Rook("8h", "blackRook2", "♜"),
];

export const testPieces = [
    new King("1e", "whiteKing", "♔"),
    new Queen("8d", "blackQueen", "♛"),
    new King("8e", "blackKing", "♚"),
    new Bishop("8f", "blackBishop2", "♝"),
    new Knight("8g", "blackKnight2", "♞"),
    new Rook("8h", "blackRook2", "♜"),
]

export default ChessBoard;
