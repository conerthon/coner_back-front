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
import MyPage from './pages/My/MyPage';

function App() {
  // ▼▼▼ 더미데이터삭제 ▼▼▼
  const [cardList, setCardList] = useState([
   
  ]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />} />

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