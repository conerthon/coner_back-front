//피그마에서 detail이름인거
import React from 'react';

const Detail = ({ item, onClose, onDeleteRequest }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent animate-fade-in">
      
      <div className="relative bg-white rounded-[30px] border-2 border-dashed border-gray-400 p-16 max-w-xl w-full mx-4 flex flex-col items-center text-center shadow-xl z-10">
        
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-600 text-2xl transition"
        >
          ✕
        </button>

        {/* 장소 이름 */}
        <h2 className="text-3xl font-extrabold text-[#374151] mb-8 tracking-tight">
          {item.title} 
        </h2>

        {/* 태그 */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {item.tags.map((tag, index) => (
            <span key={index} className="bg-[#86CDF9] text-black text-xs font-bold px-3 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <button 
          onClick={onDeleteRequest}
          className="w-full py-3 rounded-full border border-[#374151] text-[#374151] font-medium hover:bg-gray-50 transition"
        >
          맘에 안들어요!
        </button>
      </div>
    </div>
  );
};

export default Detail;