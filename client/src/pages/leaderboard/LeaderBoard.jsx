import React, { useState, useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [visibleRecords, setVisibleRecords] = useState(10);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("https://api.chess.com/pub/leaderboards");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    }

    fetchLeaderboard();
  }, []);

  const toggleShowMore = () => {
    if (visibleRecords + 10 >= 50) {
      setShowMore(!showMore);
    }
    setVisibleRecords(visibleRecords + 10);
  };

  return (
    <div className="mx-auto mt-8">
      <div className="absolute inset-0 bg-black opacity-[.7] -z-10"></div>
      <h1 className="mb-4 text-2xl font-semibold"> Leaderboard</h1>
      {leaderboardData.daily ? (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Daily Leaderboard</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Scores</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.daily
                .slice(0, visibleRecords)
                .map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.rank}</td>
                    <td className="px-4 py-2">{item.username}</td>
                    <td className="px-4 py-2">{item.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {visibleRecords < leaderboardData.daily.length && (
            <div className="mt-4">
              <button
                onClick={toggleShowMore}
                className="w-full px-4 py-2 text-white bg-black rounded-md opacity-[.5] border-b "
              >
                <p className="flex items-center justify-center gap-3 z-[10]">
                  {showMore ? "Show More" : "Show Less"}
                  <BsArrowDown className="animate-bounce" />
                </p>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-pulse">Loading the Leaderboard...</div>
      )}
    </div>
  );
}

export default Leaderboard;
