// import { makeStyles } from "@material-ui/core";
// import { purple } from "@material-ui/core/colors";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeScreen from "./pages/HomeScreen";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import VotingUnderway from "./pages/VotingUnderway";
import BeforeVoting from "./pages/BeforeVoting";
import Result from "./pages/Result";
import Ideas from "./pages/Ideas";
import VotePage from "./pages/VotePage";
import CandidateProfilePage from "./pages/CandidateProfilePage";
import PrivateRoute from "./RouteHandler/privateRoute";
import Countdown from "./components/countdown";
import VerifyLoginMagic from "./pages/VerifyLoginMagic";
import VerifyVoteMagic from "./pages/VerifyVoteMagic";

// const useStyles = makeStyles({
//   root: {
//     background: purple,
//     color: "white",
//     height: 48,
//   },
// });

function App() {
  // const classes = useStyles();
  return (
    <Router>
      <Routes>
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/" element={
          <PrivateRoute>
            <Navbar />
            <HomeScreen />
          </PrivateRoute>
        } />
        <Route path="/auth/candidate-profile" element={
          <PrivateRoute>
            <Navbar />
            <CandidateProfilePage />
          </PrivateRoute>
        } />
        <Route path="/auth/Voting_underway" element={
          <PrivateRoute>
            <Navbar />
            <VotingUnderway />
          </PrivateRoute>
        } />
        <Route path="/auth/ideas" element={
          <PrivateRoute>
            <Navbar />
            <Ideas />
          </PrivateRoute>
        } />
        <Route path="/candidate_list" element={
          <PrivateRoute>
            <Navbar />
            <VotePage />
          </PrivateRoute>
        } />
        <Route path="/candidateProfile" element={
          <PrivateRoute>
            <CandidateProfilePage />
          </PrivateRoute>
        } />
        <Route path="/auth/Before_Voting" element={
          <PrivateRoute>
            <Navbar />
            <BeforeVoting />
          </PrivateRoute>
        } />
        <Route path="/auth/Result" element={
          <PrivateRoute>
            <Navbar />
            <Result />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login/> } />
        
        <Route path="/login/enter/:email/:link" exact element={<VerifyLoginMagic />}/>
        <Route path="/verify/:email/:link" exact element={<VerifyVoteMagic />}/>
      </Routes>
    </Router>
  );
}

export default App;
