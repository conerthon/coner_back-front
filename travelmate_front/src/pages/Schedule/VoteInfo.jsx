//Tinder 참여인원 수, 살아 남은 것 , 살아남지 못한 것, 일정표 다운

import React from 'react';

const VoteInfo = ({ survivedCount, eliminatedCount, totalVoters }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 mb-20">
      {/* 상단 정보 요약 */}
      <div className="grid grid-cols-3 gap-5 flex-1 w-full">

        <InfoBox 
          icon="🙆‍♀️" 
          label="생존 장소" 
          count={survivedCount} 
        />

        <InfoBox 
          icon="🙅‍♀️" 
          label="탈락 장소" 
          count={eliminatedCount} 
        />

        <InfoBox 
          icon="🙋‍♀️" 
          label="투표 인원" 
          count={totalVoters} 
        />
        
      </div>

      {/* 일정 다운 버튼 */}
      <button 
        onClick={() => alert("일정표를 다운로드합니다!")} 
        className="flex flex-col items-center justify-center bg-[#82E2FF] text-black w-24 h-24 rounded-[30px] shadow-sm hover:bg-[#71C4F7] transition transform hover:scale-105 flex-shrink-0"
      >
        <span className="text-3xl mb-1">⬇</span>
        <span className="text-[10px] font-bold">일정다운</span>
      </button>
    </div>
  );
};

// 디자인
const InfoBox = ({ icon, label, count }) => (
  <div className="flex items-center justify-between bg-[#82E2FF] px-6 h-24 rounded-3xl shadow-sm w-full">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center bg-white bg-opacity-60 rounded-2xl text-2xl shadow-sm">
        {icon}
      </div>
      <span className="font-bold text-gray-800 text-lg">{label}</span>
    </div>
    <span className="text-3xl font-medium text-gray-900">{count}</span>
  </div>
);

export default VoteInfo;