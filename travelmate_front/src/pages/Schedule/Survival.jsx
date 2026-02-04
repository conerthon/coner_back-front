//살아남은 것 사진 목록

import React from 'react';

const Survival = ({ item }) => {
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer h-64 w-full bg-gray-200">
      <img 
        src={item.imageUrl || item.image} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        
        {/* 선택자 보여주기 */}
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">현재 투표 수</p>
          <span className="text-3xl font-extrabold text-[#86CDF9] drop-shadow-lg">
            {item.selectors}명
          </span>
          <p className="text-xs text-gray-200 mt-3 bg-white/20 px-3 py-1 rounded-full">
            {(item.users || []).join(", ")} 님이 선택함
          </p>
        </div>
      </div>
    </div>
  );
};

export default Survival;