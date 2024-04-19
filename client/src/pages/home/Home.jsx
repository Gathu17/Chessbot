import { BsDot } from "react-icons/bs";
import LoginModal from "../../components/auth/loginModal"

const Home = () => {
  const Dot = () => (
    <p className="w-[1rem] h-[1rem] bg-[#eb7e2a] rounded-full opacity-50">
      <BsDot />
    </p>
  );

  return (
    <>
      <div className="absolute lg:grid grid-cols-6 gap-1 top-[20%] -right-1 hidden">
        {Array(30)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="bg-[#c99c3e] rounded-full h-[1rem] w-[1rem]">
              
            </div>
          ))}
      </div>
      <div className="relative flex items-center justify-between w-full px-5 md:px-20">
        <div className="absolute inset-0 bg-[#000] blur z-[-1] opacity-[.7] motion-safe:animate-pulse"></div>
        <div className="w-full space-y-6">
          <h2 className="font-[900] font-[Capriola] uppercase bg-gradient-to-tr from-[#C99C3E] via-[#9b7df2] to-[#9C84E1] bg-clip-text text-transparent text-xl md:text-2xl lg:text-4xl xl:text-6xl">
            take your chess game to the next level
          </h2>
          <p>
            Connect with top-ranked chess players from around the world and
            learn the secrets to becoming a chess master
          </p>
          <div className="flex justify-center lg:justify-start" link>
            <button className="px-4 py-2 capitalize border shadow-2xl rounded-2xl shadow-[#888] animate-pulse">
              become a master
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-[#c2bfbf] opacity-[.2] blur-3xl"></div>
        <div className="items-center justify-end hidden w-full lg:flex">
          <img
            src="https://cdn0.iconfinder.com/data/icons/3d-people-playing-pack/512/playing_chess.png"
            alt=""
          />
        </div>
      </div>

    </>
  );
};

export default Home;
