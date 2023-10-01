import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Play from '../pages/play/Play';
import LeaderBoard from '../pages/leaderboard/LeaderBoard';
import Watch from '../pages/watch/Watch';
import SignIn from '../components/accountModal/SignIn';
import SignUp from '../components/accountModal/SignUp';
import PuzzlePage from '../pages/puzzles/PuzzlePage';

const Routing = () => {
  return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/play" exact element={<Play />} />
        <Route path="/puzzles" exact element={<PuzzlePage />} />
        <Route path="/leaderboard" exact element={<LeaderBoard />} />
        <Route path="/watch-and-learn" element={<Watch />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

      </Routes>
  );
};

export default Routing;