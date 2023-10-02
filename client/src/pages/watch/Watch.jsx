import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

const Watch = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [videoThumbnails, setVideoThumbnails] = useState({}); // Store video thumbnail URLs

  const videoIds = [
    "CSA9se6t82I",
    "UMSAhUzyqyI",
    "iNCZVy9INuc",
    "8ogP8mTKEds",
    "pOjzvVVrxWw",
    "3xuSaODwiHk",
    "gDrWXhGPkhI",
    "phbYrGwgjHk",
    "T0-PfqdJhQI",
    "c3B34oKM0oI",
    "KxdZxKkdmHA",
    "dKUG7qm4ZkM",
    "851pCMJv2Sg",
    "k3TYlvTK31E",
    "mEypLNcdjOY",
    "EfAixyYCy04",
    "bO_Ohp0-jls",
    "V1QXsV9SKlk",
    "bDhPKG9KT38",
    "WrFyCXDdU0A",
    "aEFLHE5E-F8",
    "xdC7bZo2STg",
    "rKXGXFhxT3Q",
    "gtdcWYWn1Go",
    "fzGKPxJ5NYI",
    "xnltKpdtetc",
  ];

  const itemsPerPage = 6;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideoIds = videoIds.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const playVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const fetchVideoData = async () => {
    try {
      // eslint-disable-next-line no-undef
      const apiKey = process.env.API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(
          ","
        )}&part=snippet`
      );
      const data = await response.json();

      const videoData = {};
      data.items.forEach((items) => {
        const videoId = items.id;
        const thumbnailUrl = items.snippet.thumbnails.default.url;
        const title = items.snippet.title; 
        videoData[videoId] = { thumbnailUrl, title };
      });
      setVideoThumbnails(videoData);
    } catch (error) {
      console.error("Error fetching video data: ", error);
    }
  };
  console.log(videoThumbnails[videoIds]);
  useEffect(() => {
    fetchVideoData();
  }, []);

  return (
    <div>
      <div className="absolute inset-0 bg-[#222] -z-[1] opacity-[.7]"></div>
      <div className="flex items-center justify-center">
        <img
          src="https://cdn3.iconfinder.com/data/icons/3d-science-and-education-illustration-sets/512/Knowledge.png"
          alt=""
          className="w-[5rem]"
        />
        <p className="text-[2rem] font-[900]">Learn from the Experts</p>
      </div>
      <div className="flex !items-start mx-auto flex-wrap gap-5 justify-center py-5">
        {currentVideoIds.map((videoId, index) => (
          <div key={videoId} className="video-thumbnail">
            {selectedVideo === videoId ? (
              <div className="w-[70vw] px-8 video-player ">
                <div className="flex justify-end">
                  <button
                    onClick={closeVideo}
                    className="flex px-2 py-1 my-2 rounded-sm bg-[#333]"
                  >
                    <CloseOutlinedIcon fontSize="large" />
                  </button>
                </div>
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&modestbranding=1`}
                  title={`YouTube video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative flex flex-wrap bg-[#222] video-thumbnail">
                <button
                  onClick={() => playVideo(videoId)}
                  className="absolute flex rounded-sm  w-[100%] h-[100%] items-center justify-center"
                >
                <span className="bg-[red] py-2 px-4 rounded-xl">
                    <PlayArrowOutlinedIcon fontSize="large" />
                  </span>
                </button>
                <div className="flex flex-col items-center shadow-xl  shadow-[#222] rounded-md">
                  <img
                    src={
                      videoThumbnails[videoId]?.thumbnailUrl ||
                      "placeholder_url_here"
                    }
                    alt={`Thumbnail for YouTube video ${index + 1}`}
                    className="w-[80%] h-[20rem]"
                  />
                  <p className="max-w-lg px-2 text-center">
                    {videoThumbnails[videoId]?.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(videoIds.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"flex justify-center my-6 space-x-4"}
        previousLinkClassName={"px-2 py-1 rounded-lg bg-gray-500 text-white"}
        nextLinkClassName={"px-2 py-1 rounded-lg bg-gray-500 text-white"}
        disabledClassName={"text-gray-400"}
        activeClassName={"bg-gray-700 text-white px-2 rounded"}
      />
    </div>
  );
};

export default Watch;
