// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header";
import Home from "./pages/Home";
import SignInPage from "./components/login/sign";
import SignUpPage from "./components/login/signUp";
import MainHome from "./pages/MainHome";
import VerifyDetails from "./pages/verify";
import MyAccount from "./pages/MyAccount";
import FundingPage from "./pages/funding";
import CopyTradingSection from "./pages/CopyTrade";
import DashboardNav from "./components/DashboardNav";
import ReferFriendPage from "./pages/Refer";

function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route index element={<Home />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="home" element={<MainHome />} />
          <Route path="verify" element={<VerifyDetails />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="funding" element={<FundingPage />} />
          <Route path="trade" element={<CopyTradingSection />} />
          <Route path="Refer-friend" element={<ReferFriendPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
