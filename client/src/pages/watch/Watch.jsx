import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImArrowUpRight } from "react-icons/im";
import { BsDot } from "react-icons/bs";
import Playing from "./Playing";

const Watch = () => {
  const [watchData, setWatchData] = useState({ streamers: [] });
  const [activeOption, setActiveOption] = useState(0);
  const [apiURL, setApiURL] = useState("");
  const [showMore, setShowMore] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiURL);
      setWatchData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (apiURL) {
      fetchData();
    }
  }, [apiURL]);

  const watchOptions = [
    {
      name: "Streamers",
      url: "https://api.chess.com/pub/streamers",
    },
    {
      name: "Playing Now",
      url: "https://api.chess.com/pub/match/12803/1",
    },
  ];

  const tableTitles = [
    {
      name: "Icon",
    },
    {
      name: "Streamer",
    },
    {
      name: "Profile",
    },
    {
      name: "Status",
    },
  ];

  const handleShowMore = () => {
    setShowMore((prevShowMore) => prevShowMore + 10);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="absolute inset-0 bg-black opacity-[.7] -z-[1]"></div>
      <div className="flex justify-center mb-4 space-x-5">
        {watchOptions.map((option, index) => (
          <button
            key={index}
            className={`px-5 py-3 border rounded-md ${
              activeOption === index ? "bg-[#81B64C]" : ""
            }`}
            onClick={() => {
              setActiveOption(index);
              setApiURL(option.url);
            }}
          >
            {option.name}
          </button>
        ))}
      </div>
      {activeOption === 0 && (
        <>
          {watchData.streamers.length > 0 && (
            <div className="w-1/2 mx-auto">
              <div className="grid grid-cols-4 py-2 bg-gray-700">
                {tableTitles.map((title, index) => (
                  <div key={index} className="p-2 font-bold text-center">
                    {title.name}
                  </div>
                ))}
              </div>
              {watchData.streamers &&
                watchData.streamers.length > 0 &&
                watchData.streamers.slice(0, showMore).map((item, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-4 items-center ${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-700"
                    } py-2 border-b border-gray-300`}
                  >
                    <div className="col-span-1 p-2">
                      <img
                        src={item.avatar}
                        className="w-12 h-12 mx-auto rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="col-span-1 p-2">{item.username}</div>
                    <div className="col-span-1 p-2">
                      <a
                        href={item.url}
                        className="flex items-center gap-4 overflow-hidden"
                      >
                        Visit Profile
                        <ImArrowUpRight className="text-xs" />
                      </a>
                    </div>
                    <div className="flex items-center col-span-1 p-2">
                      <BsDot className="text-green-500 animate-pulse text-[3rem]" />{" "}
                      Online
                    </div>
                  </div>
                ))}
              {watchData.streamers && showMore < watchData.streamers.length && (
                <div className="mt-4 text-center">
                  <button
                    className="px-4 py-2 rounded-md bg-[#81B64C] text-white"
                    onClick={handleShowMore}
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {activeOption === 1 && <Playing />}
    </div>
  );
};

export default Watch;
