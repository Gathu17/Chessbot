import React from "react";

function Square({ squareId, isEvenSquare, row, col, squareRef, handleClick }) {
  return (
    <td
      onClick={(e) => handleClick(e)}
      ref={squareRef}
      id={squareId}
      className={`square w-10 h-14 ${
        isEvenSquare ? "bg-[#E9EDCC]" : "bg-[#779954]"
      } text-center`}
      data-square={`${8 - row}-${String.fromCharCode(97 + col)}`}
    >
      {/* <span className="flex items-center justify-center text-3xl hover:scale-[1.1] text-[black] text-center">
         <span ></span>
      </span> */}
    </td>
  );
}

export default Square;
