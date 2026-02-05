import React from 'react';
import airplane from '../assets/images/airplane.png';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    // 전체 컨테이너: 네비바 높이를 제외한 영역 차지
    <div className="flex flex-row items-center justify-between px-10 md:px-24 py-10 bg-white min-h-[70vh]">
      
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            완벽한 여행 리모컨,
          </h1>
          <h1 className="text-5xl font-extrabold text-gray-800 mt-2">
            TRAVEL MATE
          </h1>
        </div>
        <br></br>
        
        <p className="text-gray-500 text-lg leading-relaxed">
          우리는 여행 정보를 수집(SAVE)만 하고, 실행(DO)하지 못합니다.<br />
          흩어진 데이터를 시각화해 보여주는 여행 준비 도움이,<br />
          트래블 메이트와 함께해보세요!
        </p>

        <Link to="/urlcatcher">
          <button className="flex items-center bg-[#486284] hover:bg-[#3b4d64] text-white px-8 py-3 rounded-full font-medium transition-all shadow-md">
            → 바로가기
          </button>
        </Link>
      </div>

      {/* 오른쪽 이미지 영역 (둥근 모서리가 핵심) */}
      <div className="flex-1 flex justify-end h-[500px]">
        <div className="w-full max-w-[600px] h-full overflow-hidden rounded-l-[150px] shadow-2xl">
          <img 
            src={airplane} 
            alt="Airplane" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;