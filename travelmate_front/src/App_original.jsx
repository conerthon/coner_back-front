//기본 import
//import { useState } from 'react'

//페이지 이동 도구 추가
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './App.css'
//MainPage import
import MainPage from './pages/mainPage';
//basic setting import
import Navbar from './components/navbar';
import Bottom from './components/bottom';
//Urlcatcher import
import URLCatcher from './pages/URLCatcher/UrlCatcherPage';
import deleteOption from './pages/URLCatcher/deleteOption';
import detail from './pages/URLCatcher/detail';
import FavoritePictureSlideBar from './pages/URLCatcher/FavoritePictureSlideBar';

//tinder import
import Tinder from './pages/Tinder/MainTinder';
import MovingSlideCard from './pages/Tinder/SwipeCard';
//import ThereisNoPicture from './pages/Tinder/ThereisNoPicture';
//Schedule import
//import Survival from './pages/Schedule/Survival';
//import Schedule from './pages/Schedule/Schedule';
//import VoteInfo from './pages/Schedule/VoteInfo';
//login&signup import
//import Login from './pages/Auth/Login';
//import Signup from './pages/Auth/Signup';



//페이지  추가
import Login from './pages/Auth/Login';

import SwipeCard from './pages/Tinder/SwipeCard';

import Signup from './pages/Auth/Signup';


function App() {
  

  return (

    <BrowserRouter>
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* 1. 상단 네비바 (따로 짜신다고 한 부분) */}
      <Navbar />

      {/* 2. 본문 히어로 섹션 */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />

         { /*<Route path="/signup" element={<Signup />} />*/}
          <Route path="/tinder" element={<Tinder />} />
          <Route path="/tinder/swipe" element={<SwipeCard />} />

         <Route path="/signup" element={<Signup />} />

         <Route path="/urlcatcher" element={<URLCatcher />} />
         <Route path="/urlcatcher/detail" element={<detail />} />
         

        </Routes>
      </main>
      <Bottom />
    </div>

    </BrowserRouter>
  )
}

export default App
