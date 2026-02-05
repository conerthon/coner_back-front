//마이페이지
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [user, setUser] = useState({
    name: "여행자", //기본 이름
    email: "이메일 정보가 없습니다.",
    profileImg: null,
    stats: {
      schedules: 0,
      places: 0,
      friends: 0
    }
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      alert("로그인이 필요한 서비스입니다."); //로그인x접근시
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(savedUser);
      
      const savedCards = JSON.parse(localStorage.getItem('cardList') || '[]');
      const savedSchedules = JSON.parse(localStorage.getItem('schedules') || '[]');

      setUser({
        name: userData.nickname || "여행자", 
        email: userData.email || "이메일 정보가 없습니다.",
        profileImg: userData.profileImage || null,
        stats: {
          schedules: savedSchedules.length || 0, //저장된 스케줄 개수 기반으로 일정 표시
          places: savedCards.length || 0, // URL Catcher 반영
          friends: 0 //초대친구 , 0으로 기본값 고정해둠
        }
      });
    } catch (error) {
      console.error("유저 정보를 불러오는 중 에러 발생:", error);
      navigate('/login');
    }
  }, [navigate, location]); 

  const savedUser = localStorage.getItem('user');
  if (!savedUser) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans">
      <div className="bg-white border-b border-gray-100 pt-16 pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">마이페이지</h1>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#86CDF9] rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-sm">
              {user.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-800">{user.name}님</h2>
              </div>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
            <button className="ml-auto text-xs font-semibold text-gray-400 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
              프로필 수정
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        {/* 상태값  */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: '내 일정', count: user.stats.schedules, color: 'text-blue-500' },
            { label: '저장한 장소', count: user.stats.places, color: 'text-indigo-500' },
            { label: '함께한 친구', count: user.stats.friends, color: 'text-teal-500' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 text-center">
              <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
              <span className={`text-xl font-extrabold ${stat.color}`}>{stat.count}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <section>
            <h3 className="text-xs font-bold text-gray-400 ml-1 mb-3">서비스 이용</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
              <MenuItem title="내 여행 계획 보기" subtitle="진행 중인 일정을 확인하세요" />
              <MenuItem title="과거 여행 히스토리" subtitle="다녀온 여행지 기록" />
              <MenuItem title="찜한 장소 리스트" subtitle="URL Catcher로 모은 장소" />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 ml-1 mb-3">계정 설정</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
              <MenuItem title="공지사항" />
              <MenuItem title="고객센터" />
              <MenuItem 
                title="로그아웃" 
                color="text-red-400" 
                isLast 
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token'); // 토큰도 함께 삭제
                  navigate('/login');
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ title, subtitle, color = "text-gray-700", isLast = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-50' : ''}`}
  >
    <div className="text-left">
      <p className={`font-semibold text-sm ${color}`}>{title}</p>
      {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" />
    </svg>
  </button>
);

export default MyPage;