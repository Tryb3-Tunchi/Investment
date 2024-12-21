// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header";
import Home from "./pages/Home";
import SignInPage from "./components/login/sign";
import SignUpPage from "./components/login/signUp";
import MainHome from "./pages/MainHome";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
