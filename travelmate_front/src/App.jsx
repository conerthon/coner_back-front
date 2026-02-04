// App.jsx
import { useState } from 'react'; // useState import 필수
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainPage from './pages/mainPage';
import Navbar from './components/navbar';
import Bottom from './components/bottom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// 페이지 import
import Tinder from './pages/Tinder/MainTinder';
import UrlCatcherPage from './pages/URLCatcher/UrlCatcherPage'; // 경로 확인 필요
import Schedule from './pages/Schedule/Schedule';

function App() {
  // ▼▼▼ 1. 데이터를 App.jsx에서 관리 (UrlCatcherPage에 있던 것 이동) ▼▼▼
  const [cardList, setCardList] = useState([
    {
      id: 1,
      title: "경주 첨성대",
      description: "신라 시대의 천문 관측소, 밤에 보면 더 예쁘다.",
      tags: ["#경주", "#역사", "#야경"],
      imageUrl: "https://images.unsplash.com/photo-1499856871940-a09627c6d7db?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "베니스 운하",
      description: "물이 흐르는 도시, 곤돌라 체험 필수.",
      tags: ["#이탈리아", "#낭만", "#물"],
      imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "그리스 산토리니",
      description: "파란 지붕과 하얀 벽, 인생샷 명소.",
      tags: ["#그리스", "#바다", "#휴양"],
      imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&auto=format&fit=crop&q=60"
    },
  ]);

  {/* 백엔드 연결전에 빈 배열로 바꾸기
    const [cardList, setCardList] = useState([]);
    */}

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ▼▼▼ 2. Props로 데이터 전달 ▼▼▼ */}
            
            {/* UrlCatcher는 데이터를 추가/삭제해야 하므로 setCardList도 전달 */}
            <Route 
              path="/urlcatcher" 
              element={<UrlCatcherPage cardList={cardList} setCardList={setCardList} />} 
            />

            {/* Tinder는 데이터를 보여주기만 하므로 cardList만 전달 */}
            <Route 
              path="/tinder" 
              element={<Tinder cardList={cardList} />} 
            />
            <Route path="/schedule" element={<Schedule cardList={cardList} />} />
            
          </Routes>
        </main>
        <Bottom />
      </div>
    </BrowserRouter>
  );
}

export default App;