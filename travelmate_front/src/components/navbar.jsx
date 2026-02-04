/*
import logo from '../assets/images/navbar/logo.svg';
import URLCatcher from '../assets/images/navbar/URLCatcher.svg';
import LogOut from '../assets/images/navbar/LogOut.svg';
import MyPAGE from '../assets/images/navbar/MYPAGE.svg';
import schedule from '../assets/images/navbar/schedule.svg';
import group from '../assets/images/navbar/group.svg';
import Tinder from '../assets/images/navbar/TinderforTravel.svg';
import React from 'react';

const Navbar = () => {
    return (
      <nav className="flex items-center justify-between px-10 py-6 bg-white">
        {/* 로고 *///}
//        <div>
//            <img src={logo} alt="logo" className="w-45 h-auto object-contain"/>
//        </div>
        
        {/* 메뉴 리스트 */}
/*        <div className="flex items-center">
          <a href="urlcatcher"><img src={URLCatcher} alt="URLCatcher" className="w-48 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2"/></a>
          <a href="tinder"><img src={Tinder} alt="Tinder"  className="w-57 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2"/></a>
          <a href="schedule"><img src={schedule} alt="schedule" className="w-42 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2"/></a>
          <a href="group"><img src={group} alt="MYPAGE" className="w-32 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2"/></a>
         <a href="mypage"><img src={MyPAGE} alt="MYPAGE" className="w-35 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2"/></a>
          <a href="logout"><img src={LogOut} alt="LogOut" className="w-35 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2"/></a>
        </div>
*///      </nav>
//    );
//  };
//  
//  export default Navbar;
//
{/* ▼▼▼ [수정된 부분: useEffect,useNavigate 추가] ▼▼▼ */}
import React, { useState, useEffect } from 'react';//수정
import logo from '../assets/images/navbar/logo.svg';
import URLCatcher from '../assets/images/navbar/URLCatcher.svg';
import LogOut from '../assets/images/navbar/LogOut.svg';
import Login from '../assets/images/navbar/Login.svg'; 
import MyPAGE from '../assets/images/navbar/MYPAGE.svg';
import schedule from '../assets/images/navbar/schedule.svg';
import groupIcon from '../assets/images/navbar/group.svg'; 
import Tinder from '../assets/images/navbar/TinderforTravel.svg';
import { Link, useNavigate } from 'react-router-dom';//수정

const Navbar = () => {
  const navigate = useNavigate(); // 이동 도구 추가

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {  // 로그인 유지 위해 추가
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => { // 로그아웃 시 메세지 추가
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate('/');
  };

  const [myGroups, setMyGroups] = useState([
    { id: 1, name: '덕성여대' },
    { id: 2, name: '코너' },
  ]);

  const [menuView, setMenuView] = useState('main');

  const handleAddGroup = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      window.location.href = '/login';
      return;
    }
    console.log("그룹 추가 페이지로 이동");
  };

  const handleMouseLeave = () => {
    setMenuView('main');
  };

  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-white ">
      {/* 로고 */}
      <Link to="/"> 
        <img src={logo} alt="logo" className="w-45 h-auto object-contain" />
      </Link>

      {/* 메뉴 리스트 */}
      <div className="flex items-center">
        <Link to="/urlcatcher">
          <img src={URLCatcher} alt="URLCatcher" className="w-48 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2" />
        </Link>
        <Link to="/tinder">
          <img src={Tinder} alt="Tinder" className="w-57 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2" />
        </Link>
        <Link to="/schedule">
          <img src={schedule} alt="schedule" className="w-42 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2" />
        </Link>

        {/* 그룹 메뉴 */}
        <div className="relative group" onMouseLeave={handleMouseLeave}>

            <img src={groupIcon} alt="Group" className="w-32 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2" />


          <div className="absolute left-1/2 -translate-x-1/2 top-full hidden w-48 bg-white border border-gray-200 rounded-lg shadow-xl group-hover:block z-50 overflow-hidden">
            {myGroups.length === 0 ? (
              <button onClick={handleAddGroup} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                그룹 추가
              </button>
            ) : (
              <>
                {menuView === 'main' && (
                  <div className="flex flex-col">
                    <button onClick={handleAddGroup} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
                      그룹 추가
                    </button>
                    <button onClick={() => setMenuView('list')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      그룹 선택
                    </button>
                  </div>
                )}
                {menuView === 'list' && (
                  <div className="flex flex-col">
                    <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 border-b border-gray-200">
                      그룹 선택
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {myGroups.map((group) => (
                        <a key={group.id} href={`/group/${group.id}`} className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-50 last:border-none">
                          {group.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <a href="mypage">
          <img src={MyPAGE} alt="MYPAGE" className="w-35 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2" />
        </a>

        {/* ▼▼▼ [수정된 부분: a 태그대신 button 이용 ] ▼▼▼ */}
        {isLoggedIn ? (
          // 로그인 상태일 때: 로그아웃 버튼 표시
          <button onClick={handleLogout} className="focus:outline-none">
            <img src={LogOut} alt="LogOut" className="w-35 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2" />
          </button>
        ) : (
          // 비로그인 상태일 때: 로그인 버튼 표시
          <Link to="/login">
            <img src={Login} alt="Login" className="w-29 h-auto block p-8 transition duration-300 ease-in-out hover:-translate-y-2" />
          </Link>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;