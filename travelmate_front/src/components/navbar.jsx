import React, { useState, useEffect } from 'react';
import axios from 'axios'; // [필수] 서버 통신을 위해 추가
import { Link, useNavigate,useLocation } from 'react-router-dom';

// 이미지 import (경로는 기존 그대로 유지)
import logo from '../assets/images/navbar/logo.svg';
import URLCatcher from '../assets/images/navbar/URLCatcher.svg';
import LogOut from '../assets/images/navbar/LogOut.svg';
import Login from '../assets/images/navbar/Login.svg'; 
import MyPAGE from '../assets/images/navbar/MYPAGE.svg';
import schedule from '../assets/images/navbar/schedule.svg';
import groupIcon from '../assets/images/navbar/group.svg'; 
import Tinder from '../assets/images/navbar/TinderforTravel.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  // [수정 1] 초기값을 빈 배열 []로 설정하여 맵핑 오류 방지
  const [myGroups, setMyGroups] = useState([]); 
  const [menuView, setMenuView] = useState('main'); // 'main' 또는 'list'

  // ▼▼▼ 모달 관련 상태 ▼▼▼
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('create'); 
  const [groupNameInput, setGroupNameInput] = useState(''); 
  const [inviteCodeInput, setInviteCodeInput] = useState(''); 
  const [createdGroupData, setCreatedGroupData] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsLoggedIn(true);
      fetchMyGroups(); // 로그인 상태라면 그룹 목록 불러오기
    } else {
      setIsLoggedIn(false);
      setMyGroups([]);
    }
  }, [location]);

  // [수정 2] DB에서 그룹 목록 가져오는 함수
  const fetchMyGroups = async () => {
    try {
      // API 호출
      const response = await axios.get('http://localhost:8080/api/groups/my', { withCredentials: true });
      
      // 데이터가 배열인지 확인 후 저장 (안전장치)
      if (Array.isArray(response.data)) {
        setMyGroups(response.data);
      } else {
        setMyGroups([]); 
      }
    } catch (error) {
      console.error("그룹 목록 로딩 실패:", error);
      setMyGroups([]); // 에러 발생 시 빈 배열로 초기화하여 흰 화면 방지
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setIsLoggedIn(false);
    setMyGroups([]);
    alert("로그아웃 되었습니다.");
    navigate('/');
  };

  // 모달 열기
  const handleOpenModal = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }
    setGroupNameInput('');
    setInviteCodeInput('');
    setCreatedGroupData(null); 
    setModalTab('create');
    setIsModalOpen(true);
    setMenuView('main'); // 드롭다운 메뉴 초기화
  };

  // 초대코드 복사
  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("초대코드가 복사되었습니다!");
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  // 그룹 생성
  const handleCreateGroup = async () => {
    if (!groupNameInput.trim()) {
      alert("그룹 이름을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/groups', { groupName: groupNameInput }, { withCredentials: true });
      setCreatedGroupData({
        name: response.data.groupName,
        code: response.data.inviteCode
      });
      fetchMyGroups(); // 목록 갱신
    } catch (error) {
      alert("그룹 생성 실패: " + (error.response?.data || "다시 시도해주세요."));
    }
  };

  // 그룹 참여
  const handleJoinGroup = async () => {
    if (!inviteCodeInput.trim()) {
      alert("초대 코드를 입력해주세요.");
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/groups/join', { inviteCode: inviteCodeInput }, { withCredentials: true });
      alert("그룹에 성공적으로 참여했습니다!");
      setIsModalOpen(false);
      fetchMyGroups(); // 목록 갱신
    } catch (error) {
      alert("참여 실패: " + (error.response?.data || "코드를 확인해주세요."));
    }
  };

  const handleMouseLeave = () => {
    setMenuView('main');
  };

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-6 bg-white relative z-10">
        <Link to="/"> <img src={logo} alt="logo" className="w-45 h-auto object-contain" /> </Link>

        <div className="flex items-center">
          <Link to="/urlcatcher"><img src={URLCatcher} alt="URLCatcher" className="w-48 h-auto block p-8 hover:-translate-y-2 transition" /></Link>
          <Link to="/tinder"><img src={Tinder} alt="Tinder" className="w-57 h-auto block p-8 hover:-translate-y-2 transition" /></Link>
          <Link to="/schedule"><img src={schedule} alt="schedule" className="w-42 h-auto block p-8 hover:-translate-y-2 transition" /></Link>

          {/* ▼▼▼ 그룹 메뉴 드롭다운 (DB 연결됨) ▼▼▼ */}
          <div className="relative group" onMouseLeave={handleMouseLeave}>
              <img src={groupIcon} alt="Group" className="w-32 h-auto block p-8 hover:-translate-y-2 transition cursor-pointer" />

            <div className="absolute left-1/2 -translate-x-1/2 top-full hidden w-48 bg-white border border-gray-200 rounded-lg shadow-xl group-hover:block z-50 overflow-hidden">
                
                {/* 1. 그룹이 하나도 없을 때 */}
                {myGroups.length === 0 ? (
                    <button type="button" onClick={handleOpenModal} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
                      + 새 그룹 만들기
                    </button>
                ) : (
                  <>

                    {/* 2. 메인 메뉴 (그룹 만들기 / 목록 선택) */}
                    {menuView === 'main' && (
                      <div className="flex flex-col">
                        <button type="button" onClick={handleOpenModal} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
                          + 새 그룹 / 초대코드
                        </button>
                        {/* [수정 3] type="button" 추가하여 새로고침 방지 */}
                        <button type="button" onClick={() => setMenuView('list')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                          내 그룹 목록
                        </button>
                      </div>
                    )}

                    {/* 3. 목록 뷰 (DB 데이터 출력) */}
                    {menuView === 'list' && (
                      <div className="flex flex-col">
                        <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 border-b border-gray-200 flex justify-between items-center">
                          <span>참여 중인 그룹</span>
                          <button type="button" onClick={() => setMenuView('main')} className="text-gray-400 hover:text-gray-600">↩</button>
                        </div>
                        
                        <div className="max-h-60 overflow-y-auto">
                          {/* [수정 4] 데이터 매핑 (필드명 groupName 사용) */}
                          {myGroups.map((group) => (
                            <Link 
                              key={group.id} 
                              to={`/group/${group.id}`} 
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-50 last:border-none"
                            >
                              {/* DB에서 가져온 필드명은 groupName 입니다 */}
                              {group.groupName} 
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
            </div>
          </div>

          <Link to="/mypage"><img src={MyPAGE} alt="MYPAGE" className="w-35 h-auto block p-8 hover:-translate-y-2 transition" /></Link>

          {isLoggedIn ? (
            <button type="button" onClick={handleLogout}><img src={LogOut} alt="LogOut" className="w-35 h-auto block p-8 hover:-translate-y-2 transition" /></button>
          ) : (
            <Link to="/login"><img src={Login} alt="Login" className="w-29 h-auto block p-8 hover:-translate-y-2 transition" /></Link>
          )}
        </div>
      </nav>

      {/* 모달 UI (이전과 동일) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] overflow-hidden transform transition-all scale-100">
            <div className="flex border-b border-gray-100">
              <button type="button"
                className={`flex-1 py-4 text-sm font-bold ${modalTab === 'create' ? 'bg-[#2F4A6D] text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                onClick={() => { setModalTab('create'); setCreatedGroupData(null); }}
              >
                새 그룹 만들기
              </button>
              <button type="button"
                className={`flex-1 py-4 text-sm font-bold ${modalTab === 'join' ? 'bg-[#2F4A6D] text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                onClick={() => { setModalTab('join'); setCreatedGroupData(null); }}
              >
                초대 코드로 참여
              </button>
            </div>

            {modalTab === 'create' && (
              <div className="p-8">
                {!createdGroupData ? (
                  <>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">어떤 여행을 떠나시나요?</h3>
                    <p className="text-sm text-gray-500 mb-6">멋진 그룹 이름을 지어주세요!</p>
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-gray-700 mb-2">그룹 이름</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F4A6D] transition-all"
                        placeholder="예: 부산 먹방 여행"
                        value={groupNameInput}
                        onChange={(e) => setGroupNameInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCreateGroup()}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">취소</button>
                      <button type="button" onClick={handleCreateGroup} className="flex-1 py-3 bg-[#2F4A6D] text-white rounded-xl font-bold hover:bg-[#243a56] shadow-lg transition">생성하기</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-2xl">🎉</span></div>
                      <h3 className="text-xl font-bold text-gray-800">그룹이 생성되었습니다!</h3>
                      <p className="text-sm text-gray-500 mt-1">친구들에게 초대 코드를 공유하세요.</p>
                    </div>
                    <div className="mb-4">
                       <label className="block text-sm font-bold text-gray-700 mb-2">그룹 이름</label>
                       <input type="text" value={createdGroupData.name} readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500" />
                    </div>
                    <div className="mb-8">
                      <label className="block text-sm font-bold text-gray-700 mb-2">초대 코드</label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-50 px-4 py-3 rounded-lg text-center font-mono text-xl font-bold text-[#2F4A6D] tracking-widest border border-gray-200">{createdGroupData.code}</div>
                        <button type="button" onClick={() => handleCopyCode(createdGroupData.code)} className="bg-[#2F4A6D] hover:bg-[#243a56] text-white px-4 py-3 rounded-lg font-bold transition shadow-md">복사</button>
                      </div>
                    </div>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition">닫기</button>
                  </>
                )}
              </div>
            )}

            {modalTab === 'join' && (
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2 text-gray-800">친구에게 받은 코드가 있나요?</h3>
                <p className="text-sm text-gray-500 mb-6">6자리 초대 코드를 입력해주세요.</p>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F4A6D] mb-6 text-center font-mono text-lg uppercase"
                  placeholder="CODE"
                  maxLength={6}
                  value={inviteCodeInput}
                  onChange={(e) => setInviteCodeInput(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinGroup()}
                />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">취소</button>
                  <button type="button" onClick={handleJoinGroup} className="flex-1 py-3 bg-[#2F4A6D] text-white rounded-xl font-bold hover:bg-[#243a56] shadow-lg transition">참여하기</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;