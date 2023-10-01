import React, { useEffect, useState } from "react";
import axios from "axios";

const ChessMatch = () => {
  const [matchData, setMatchData] = useState({});

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await axios.get(
          "https://api.chess.com/pub/match/12803/1"
        );
        setMatchData(response.data);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-semibold">Match</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Match Details</h2>
        <ul>
          <li>
            ID: {matchData.id}
          </li>
          <li>
            URL: <a href={matchData.url} target="_blank" rel="noopener noreferrer">{matchData.url}</a>
          </li>
          <li>
            Time Control: {matchData.time_control}
          </li>
          <li>
            End Time: {matchData.end_time}
          </li>
          {/* Add more details as needed */}
        </ul>
      </div>
    </div>
  );
};

export default ChessMatch;
