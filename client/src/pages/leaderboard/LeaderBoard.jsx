import React, { useState, useEffect } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BiGitCommit } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import axios from "axios";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [visibleRecords, setVisibleRecords] = useState(10);
  const [countryFlags, setCountryFlags] = useState({});
  const [loadingFlags, setLoadingFlags] = useState({});

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("https://api.chess.com/pub/leaderboards");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLeaderboardData(data.daily || []);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    }

    fetchLeaderboard();
  }, []);

  const toggleShowMore = () => {
    if (visibleRecords + 10 >= leaderboardData.length) {
      setShowMore(!showMore);
    }
    setVisibleRecords(visibleRecords + 10);
  };

  useEffect(() => {
    async function fetchCountryFlags() {
      const flags = {};
      const loadingFlagsData = {};
      const countryCodes = leaderboardData.map((item) => {
        const parts = item.country.split("/");
        let countryCode = parts[parts.length - 1];

        countryCode = countryCode.replace(/^XB/, "UM");
        countryCode = countryCode.replace(/^XE/, "LU");

        return countryCode;
      });

      for (const countryCode of countryCodes) {
        try {
          loadingFlagsData[countryCode] = true; 
          const response = await axios.get(
            `https://restcountries.com/v3/alpha/${countryCode}`
          );

          if (response.status === 200) {
            const data = response.data;
            const flagUrl = data[0].flags[1];
            flags[countryCode] = flagUrl;
          } else {
            throw new Error("Failed to fetch country flag");
          }
        } catch (error) {
          console.error("Error fetching country flag:", error);
        } finally {
          loadingFlagsData[countryCode] = false;
        }
      }

      setCountryFlags(flags);
      setLoadingFlags(loadingFlagsData); 
    }

    fetchCountryFlags();
  }, [leaderboardData]);


  return (
    <div className="min-h-screen p-4">
      <div className="absolute inset-0 bg-black -z-[2] opacity-[.6]"></div>
      <h1 className="text-[1.5rem] text-center">
        Leaderboard from Chess.com Updated on {new Date().toUTCString()}
      </h1>
      <div className="h-[3rem] my-4 mt-4 flex items-center justify-between px-8">
        <p className="w-1/3"></p>
        <p className="w-[10rem] px-2 py-3 font-extrabold">Bullet</p>
        <p className="w-[10rem] px-2 py-3 font-extrabold">Blitz</p>
        <p className="w-[10rem] px-2 py-3 font-extrabold">Rapid</p>
      </div>
      {leaderboardData.slice(0, visibleRecords).map((item, index) => {
        const countryCode = item.country.split("/").pop();
        const flagUrl = countryFlags[countryCode];
        const isLoadingFlag = loadingFlags[countryCode];
        const trendRankDirection = item.trend_rank
          ? item.trend_rank.direction
          : null;
        const trendScoreDirection = item.score_rank
          ? item.score_rank.direction
          : null;

        return (
          <div key={index} className="flex justify-between p-4">
            <div className="flex items-center w-1/2 gap-4">
              <img
                src={item.avatar}
                className="w-1/6 border rounded-md"
                alt=""
              />{" "}
              <p className="flex items-center gap-2">
                <a
                  data-tooltip-id="name-tooltip"
                  data-tooltip-content={`Name: ${
                    item.name === undefined ? "_" : item.name
                  }`}
                  data-tooltip-place="top"
                >
                  {item.username}{" "}
                </a>
                <Tooltip id="name-tooltip" />
                <a
                  data-tooltip-id="badge-tooltip"
                  data-tooltip-content={`User: ${
                    item.status === "premium" ? "Premium User" : "Basic User"
                  }`}
                  data-tooltip-place="top"
                >
                  <span>
                    {item.status === "premium" ? (
                      <MdOutlineWorkspacePremium className="text-[gold]" />
                    ) : (
                      <BiGitCommit className="text-[#9696f4]" />
                    )}
                  </span>{" "}
                </a>
                <Tooltip id="badge-tooltip" />
              </p>
              {isLoadingFlag && (
                <span className="w-6 h-6 rounded-full inline-block border-t-[#fff] border-[3px] box-border border-r-transparent animate-spin"></span>
              )}
              {!isLoadingFlag && (
                <img
                  src={flagUrl}
                  alt=""
                  className="w-[1rem]"
                  onLoad={() => setLoadingFlags({ ...loadingFlags, [countryCode]: false })}
                />
              )}
            </div>
            <div className="flex w-full gap-2 justify-evenly">
              <p className="flex items-center w-full justify-between px-[5%] rounded-sm lg:rounded-xl border-2 border-[#afaf3f]">
                <p className="flex items-center">
                  {trendRankDirection && trendRankDirection < 0 ? (
                    <BsArrowDown className="animate-pulse text-[red]" />
                  ) : trendRankDirection === 0 ? null : (
                    <BsArrowUp className="animate-pulse text-[gold]" />
                  )}
                  <span>{item.rank}</span>
                </p>
                <p className="flex items-center">
                  {trendScoreDirection && trendScoreDirection < 0 ? (
                    <BsArrowDown className="animate-pulse text-[red]" />
                  ) : trendScoreDirection === 0 ? null : (
                    <BsArrowUp className="animate-pulse text-[gold]" />
                  )}
                  <span>{item.score}</span>
                </p>
              </p>
              <p className="flex items-center w-full justify-between px-[5%] rounded-sm lg:rounded-xl border-2 border-[#d3a19e]">
                <p className="flex items-center">
                  {trendRankDirection && trendRankDirection < 0 ? (
                    <BsArrowDown className="animate-pulse text-[red]" />
                  ) : trendRankDirection === 0 ? null : (
                    <BsArrowUp className="animate-pulse text-[gold]" />
                  )}
                  <span>{item.rank}</span>
                </p>
                <p className="flex items-center">
                  {trendScoreDirection && trendScoreDirection < 0 ? (
                    <BsArrowDown className="animate-pulse text-[red]" />
                  ) : trendScoreDirection === 0 ? null : (
                    <BsArrowUp className="animate-pulse text-[gold]" />
                  )}
                  <span>{item.score}</span>
                </p>
              </p>
              <p className="flex items-center w-full justify-between px-[5%] rounded-sm lg:rounded-xl border-2 border-[#3f8daf]">
                <p className="flex items-center">
                  {trendRankDirection && trendRankDirection < 0 ? (
                    <BsArrowDown className="animate-pulse text-[red]" />
                  ) : trendRankDirection === 0 ? null : (
                    <BsArrowUp className="animate-pulse text-[gold]" />
                  )}
                  <span>{item.rank}</span>
                </p>
                <p className="flex items-center">
                  {trendScoreDirection && trendScoreDirection < 0 ? (
                    <BsArrowDown className="animate-pulse text-[red]" />
                  ) : trendScoreDirection === 0 ? null : (
                    <BsArrowUp className="animate-pulse text-[gold]" />
                  )}
                  <span>{item.score}</span>
                </p>
              </p>
            </div>
          </div>
        );
      })}
      {visibleRecords < leaderboardData.length && (
        <div className="mt-4">
          <button
            onClick={toggleShowMore}
            className="w-1/2 flex mx-auto px-4 py-4 bg-[#222] rounded-md opacity-[.5] border-b"
          >
            <p className="flex items-center text-center justify-center w-full gap-3 z-[999] !text-[#af463f]">
              {showMore ? "Show More" : "Show Less"}
              <BsArrowDown className="animate-bounce" />
            </p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
