import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInfo, FaPlus } from "react-icons/fa";
import { GiEmptyChessboard, GiTabletopPlayers } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";
import { FiCodesandbox } from "react-icons/fi";
import { SiHandshake } from "react-icons/si";
import { TbTournament } from "react-icons/tb";
import { MdLogout, MdRestartAlt } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { BsDot } from "react-icons/bs";
import {isValidMove} from '../../utils/validate'
import Game from '../../utils/Game'
import {pieces} from '../../utils/ChessBoard'
import startBoard from '../../utils/ChessBoard'
import ChessBoard from '../../utils/ChessBoard'

const Play = () => {
  
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [playerScores, setPlayerScores] = useState([0, 0]);
  const [countdownTime, setCountdownTime] = useState(60);
  const [activeLink, setActiveLink] = useState(["newGame", "games", "players"]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [peopleOnline, setPeopleOnline] = useState([]);

  const initialChessboard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ];
  const game = new Game(pieces);
  
  
  const flattenedChessIcons = initialChessboard.flat();
  const [chessIcons, setChessIcons] = useState(flattenedChessIcons);
  const switchPlayers = () => {
    setPlayerScores(([score1, score2]) => [score2, score1]);
    setSelectedPiece(null);
    setCountdownTime(60);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    console.log(pieces)
  },[])

  const handlePieceClick = (row, col) => {
    const piece = chessIcons[row * 8 + col];
   
    if (selectedPiece) {
      if (selectedPiece.row === row && selectedPiece.col === col) {
        return;
      }
    //  console.log(isValidMove(selectedPiece.piece, selectedPiece.row, selectedPiece.col, row,col));
      
      if(isValidMove(selectedPiece.piece, selectedPiece.row, selectedPiece.col, row, col)){
          const newChessIcons = [...chessIcons];
          newChessIcons[row * 8 + col] = selectedPiece.piece;
          newChessIcons[selectedPiece.row * 8 + selectedPiece.col] = "";
          setChessIcons(newChessIcons);
          setSelectedPiece(null);
          switchPlayers();
      } else {
        return;
      }
      
      
    } else if (piece) {
      setSelectedPiece({ piece, row, col });
    }
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
    setSelectedTime("");
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const menu = [
    {
      menu: "New Game",
      icon: FaPlus,
    },
    {
      menu: "Games",
      icon: GiEmptyChessboard,
    },
    {
      menu: "Players",
      icon: GiTabletopPlayers,
    },
  ];

  const games = [
    {
      gamesNow: 668,
      gamesToday: 1056,
    },
  ];

  async function randomUsers() {
    try {
      const response = await axios.get("https:randomuser.me/api/?results=15");
      setPeopleOnline(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    randomUsers();
  }, [activeLink]);

  const gameSideMenu = [
    {
      menu: "New Game",
      icon: <FaPlus />,
    },
    {
      menu: "Restart",
      icon: <MdRestartAlt />,
    },
    {
      menu: "Players",
      icon: <GiTabletopPlayers />,
    },
    {
      menu: "About",
      icon: <FaInfo />,
    },
    {
      menu: "Message",
      icon: <BiMessageSquareDetail />,
    },

    {
      menu: "Logout",
      icon: <MdLogout />,
    },
    {
      menu: "Exit",
      icon: <ImExit />,
    },
  ];

  return (
    <div className="flex flex-col justify-between space-y-8 lg:flex-row">
      <div className="lg:w-[10%] px-4 lg:px-0 shadow-2xl shadow-[#444]">
        <div className="flex flex-wrap w-full h-full lg:flex-col justify-evenly">
          {gameSideMenu.map((menu, index) => (
            <div
              className="flex flex-col items-center gap-2 mx-2 my-2 hover:scale-[1.1] cursor-pointer"
              key={index}
            >
              <p className="text-[1.5rem]">{menu.icon}</p>
              <p>{menu.menu}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between py-5 shadow-[#333] shadow-2xl lg:w-1/2">
        <div className="flex lg:items-start justify-between px-4 py-2 mb-4 text-white rounded-lg lg:space-x-[3rem] lg:w-full w-full sm:w-3/4 gap-6 items-center">
          <div className="flex flex-col items-center lg:flex-row ">
            <div className="flex items-center justify-center w-6 h-6 rounded-full lg:w-12 lg:h-12">
              <img
                src="https://picsum.photos/50/50"
                className="w-full rounded-full"
                alt=""
              />
            </div>
            <span className="ml-3 text-lg font-semibold">Opponent</span>
            <span id="turn"></span>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-sm">Score:</span>
            <span className="text-xl font-bold">{playerScores[0]}</span>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-sm">Time Remaining:</span>
            <span className="text-xl font-bold">{countdownTime} sec</span>
          </div>
        </div>
        {/* <div id="board" className="flex flex-wrap w-[400px] h-[400px]">
		<div id="final" className="odd bg-green-500">
			<div id="81" className="square w-1/8 h-1/8 " data-square="8-a"></div>
			<div id="82" className="square w-1/8 h-1/8 " data-square="8-b"></div>
			<div id="83" className="square w-1/8 h-1/8" data-square="8-c"></div>
			<div id="84" className="square w-1/8 h-1/8" data-square="8-d"></div>
			<div id="85" className="square w-1/8 h-1/8" data-square="8-e"></div>
			<div id="86" className="square w-1/8 h-1/8" data-square="8-f"></div>
			<div id="87" className="square w-1/8 h-1/8" data-square="8-g"></div>
			<div id="88" className="square w-1/8 h-1/8" data-square="8-h"></div>
		</div>
		<div className="even bg-slate-200">
			<div id="71" className="square" data-square="7-a"></div>
			<div id="72" className="square" data-square="7-b"></div>
			<div id="73" className="square" data-square="7-c"></div>
			<div id="74" className="square" data-square="7-d"></div>
			<div id="75" className="square" data-square="7-e"></div>
			<div id="76" className="square" data-square="7-f"></div>
			<div id="77" className="square" data-square="7-g"></div>
			<div id="78" className="square" data-square="7-h"></div>
		</div>
		<div className="odd bg-green-500">
			<div id="61" className="square" data-square="6-a"></div>
			<div id="62" className="square" data-square="6-b"></div>
			<div id="63" className="square" data-square="6-c"></div>
			<div id="64" className="square" data-square="6-d"></div>
			<div id="65" className="square" data-square="6-e"></div>
			<div id="66" className="square" data-square="6-f"></div>
			<div id="67" className="square" data-square="6-g"></div>
			<div id="68" className="square" data-square="6-h"></div>
		</div>
		<div className="even  bg-slate-200">
			<div id="51" className="square" data-square="5-a"></div>
			<div id="52" className="square" data-square="5-b"></div>
			<div id="53" className="square" data-square="5-c"></div>
			<div id="54" className="square" data-square="5-d"></div>
			<div id="55" className="square" data-square="5-e"></div>
			<div id="56" className="square" data-square="5-f"></div>
			<div id="57" className="square" data-square="5-g"></div>
			<div id="58" className="square" data-square="5-h"></div>
		</div>
		<div className="odd">
			<div id="41" className="square" data-square="4-a"></div>
			<div id="42" className="square" data-square="4-b"></div>
			<div id="43" className="square" data-square="4-c"></div>
			<div id="44" className="square" data-square="4-d"></div>
			<div id="45" className="square" data-square="4-e"></div>
			<div id="46" className="square" data-square="4-f"></div>
			<div id="47" className="square" data-square="4-g"></div>
			<div id="48" className="square" data-square="4-h"></div>
		</div>
		<div className="even  bg-slate-200">
			<div id="31" className="square" data-square="3-a"></div>
			<div id="32" className="square" data-square="3-b"></div>
			<div id="33" className="square" data-square="3-c"></div>
			<div id="34" className="square" data-square="3-d"></div>
			<div id="35" className="square" data-square="3-e"></div>
			<div id="36" className="square" data-square="3-f"></div>
			<div id="37" className="square" data-square="3-g"></div>
			<div id="38" className="square" data-square="3-h"></div>
		</div>
		<div className="odd">
			<div className="square white" id="21" data-square="2-a"></div>
			<div className="square white" id="22" data-square="2-b"></div>
			<div className="square white" id="23" data-square="2-c"></div>
			<div className="square white" id="24" data-square="2-d"></div>
			<div className="square white" id="25" data-square="2-e"></div>
			<div className="square white" id="26" data-square="2-f"></div>
			<div className="square white" id="27" data-square="2-g"></div>
			<div className="square white" id="28" data-square="2-h"></div>
		</div>
		<div className="even">
			<div id="11" className="square white" data-square="1-a"></div>
			<div id="12" className="square white" data-square="1-b"></div>
			<div id="13" className="square white" data-square="1-c"></div>
			<div id="14" className="square white" data-square="1-d"></div>
			<div id="15" className="square white" data-square="1-e"></div>
			<div id="16" className="square white" data-square="1-f"></div>
			<div id="17" className="square white" data-square="1-g"></div>
			<div id="18" className="square white" data-square="1-h"></div>
		</div>
	</div> */}
  {/* <table id="board" className="w-[400px] ">
    <tbody>
    {[...Array(8).keys()].map((_,row) =>
      <tr key={row}>
      {[...Array(8).keys()].map((_,col) => {
        const squareId = `${8 - row}${String.fromCharCode(97 + col)}`;
        const isEvenSquare = (row + col) % 2 === 0;
        return (
          <td
            key={squareId}
            id={squareId}
            className={`square w-10 h-14 ${isEvenSquare ? "bg-[#E9EDCC]" : "bg-[#779954]"} text-center`}
            data-square={`${8 - row}-${String.fromCharCode(97 + col)}`}
          > */}
            {/* <span className="flex items-center justify-center text-3xl hover:scale-[1.1] text-[black] text-center">
               <span ></span>
            </span> */}
          {/* </td>
        );
      })}
      </tr>
    )}
  </tbody>
</table> */}
      <ChessBoard game={game} />
        <div className="flex lg:items-start justify-between px-4 py-2 mb-4 text-white rounded-lg lg:space-x-[3rem] lg:w-full w-full sm:w-3/4 gap-6 items-center mt-5">
          <div className="flex flex-col items-center lg:flex-row ">
            <div className="flex items-center justify-center w-6 h-6 rounded-full lg:w-12 lg:h-12">
              <img
                src="https://picsum.photos/50/51"
                className="w-full rounded-full"
                alt=""
              />
            </div>
            <span className="ml-3 text-lg font-semibold">You</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm">Score:</span>
            <span className="text-xl font-bold">{playerScores[1]}</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm">Time Remaining:</span>
            <span className="text-xl font-bold">{countdownTime} sec</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-3/4 mx-auto shadow-xl lg:mx-5 lg:w-1/3 shadow-[#333]">
        <div className="flex  bg-[#111] justify-around rounded-md shadow-md  my-3">
          {menu.map((menu, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-between text-white  p-2 hover:bg-[#252525] cursor-pointer"
                onClick={
                  index === 0
                    ? () => setActiveLink("newGame")
                    : index === 1
                    ? () => setActiveLink("games")
                    : () => setActiveLink("players")
                }
              >
                <menu.icon className="text-2xl" />
                <p className="">{menu.menu}</p>
              </div>
            );
          })}
        </div>
        {activeLink === "newGame" && (
          <div className="relative p-4">
            <div className="bg-[black] absolute inset-0 -z-[1] opacity-[.6]"></div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-white text-md">
                Select Chess Game Type:
              </label>
              <select
                onChange={handleGameChange}
                value={selectedGame}
                className="w-full p-2 py-4 bg-[#333] rounded-md shadow-sm "
              >
                <option className="text-[grey] italic" value="">
                  Select...
                </option>
                <option value="bullet">Bullet</option>
                <option value="blitz">Blitz</option>
                <option value="rapid">Rapid</option>
              </select>
            </div>
            {selectedGame && (
              <div className="mb-4 ">
                <label className="block mb-1 font-medium text-white text-md">
                  Select Time Duration:
                </label>
                <select
                  onChange={handleTimeChange}
                  value={selectedTime}
                  className="w-full p-2 py-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:ring-opacity-50 bg-[#252525]"
                >
                  <option className="text-[grey] italic" value="">
                    Select...
                  </option>
                  {selectedGame === "bullet" && (
                    <>
                      <option value="1">1 minute</option>
                      <option value="2">2 minutes</option>
                      <option value="3">3 minutes</option>
                    </>
                  )}
                  {selectedGame === "blitz" && (
                    <>
                      <option value="3">3 minutes</option>
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                    </>
                  )}
                  {selectedGame === "rapid" && (
                    <>
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="20">20 minutes</option>
                    </>
                  )}
                </select>
              </div>
            )}
            {selectedGame && selectedTime && (
              <div className="p-3 mb-4 bg-[#252525] rounded-md">
                Selected Game: {selectedGame} | Time: {selectedTime} minutes
              </div>
            )}
            <button className="w-full py-3 bg-[#189918] rounded-md  flex justify-center items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Play</h1>
              </div>
            </button>
            <br />
            <div className="space-y-2">
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-3 bg-[#1f1f1f] rounded-md  flex justify-center items-center">
                  <div>
                    <h1 className="flex justify-center w-full space-x-2 text-2xl font-bold text-white capitalize">
                      {" "}
                      <SiHandshake className="mr-3 text-2xl" /> Play a friend
                    </h1>
                  </div>
                </button>
                <button className="px-4 py-3 bg-[#1f1f1f] rounded-md  flex justify-center items-center">
                  <div>
                    <h1 className="flex justify-center w-full space-x-2 text-2xl font-bold text-white capitalize">
                      {" "}
                      <RiComputerLine className="mr-3 text-2xl" /> Play with
                      Computer
                    </h1>
                  </div>
                </button>
                <button className="px-4 py-3 bg-[#1f1f1f] rounded-md  flex justify-center items-center">
                  <div>
                    <h1 className="flex justify-center w-full space-x-2 text-2xl font-bold text-white capitalize">
                      {" "}
                      <FiCodesandbox className="mr-3 text-2xl" /> Practice
                    </h1>
                  </div>
                </button>
                <button className="px-4 py-3 bg-[#1f1f1f] rounded-md  flex justify-center items-center">
                  <div>
                    <h1 className="flex justify-center w-full space-x-2 text-2xl font-bold text-white capitalize">
                      <TbTournament className="mr-3 text-2xl" /> tournaments
                    </h1>
                  </div>
                </button>
              </div>
              <div className="py-6">
                {games.map((gamesplayed, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-xl text-white justify-evenly"
                    >
                      <div className="flex">
                        {gamesplayed.gamesNow}{" "}
                        <span className="flex items-center text-sm italic text-gray-300">
                          <BsDot className=" text-[green] text-[1.5rem] animate-pulse" />{" "}
                          Playing Now
                        </span>
                      </div>
                      <div>
                        {gamesplayed.gamesToday}{" "}
                        <span className="text-sm italic text-gray-300">
                          Games Today
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeLink === "players" && (
          <div className="w-full border-b">
            <div className="flex justify-between border-b">
              <p>No.</p>
              <p>Name</p>
              <p>Rank</p>
              <p>Status</p>
            </div>
            {peopleOnline.map((user, index) => (
              <div
                key={index}
                className="flex items-center py-1 justify-evenly"
              >
                <p className="w-1/3">{index + 1}</p>
                <p className="flex justify-center w-full">{`${user.name.first}`}</p>
                <p className="flex w-full px-8">{user.dob.age}</p>
                <p
                  className={`w-[.51rem] h-[.51rem]  rounded-full p-1 mr-4 ${
                    user.dob.age > 40 ? "bg-[green] animate-pulse" : "bg-[red]"
                  }`}
                ></p>
              </div>
            ))}
          </div>
        )}

        {/* Chessboard */}
        {/* ... Your chessboard code ... */}
      </div>
    </div>
  );
};

export default Play;
