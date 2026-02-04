import React from 'react';
const MainTinder = () => {
    return(
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
        {/* 진행도 */}
        <p className="text-sm text-gray-400 mb-2">3/3</p>
  
        {/* 타이틀 */}
        <h1 className="text-5xl font-bold mb-2">TINDER FOR TRAVEL</h1>
        <p className="text-gray-500 mb-8">
          싸우지 말고, 스와이프로 결정하세요!
        </p>
  
        {/* 카드 영역 */}
        <div className="relative w-[520px] h-[320px]">
          {/* 뒤에 깔린 카드 */}
          <div className="absolute top-4 left-4 w-full h-full rounded-3xl bg-blue-200" />
          <div className="absolute top-2 left-2 w-full h-full rounded-3xl bg-blue-300" />
  
          {/* 메인 카드 */}
          <img
            src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200"
            alt="travel"
            className="relative w-full h-full object-cover rounded-3xl shadow-xl"
          />
        </div>
      </div>
    );
};


export default MainTinder