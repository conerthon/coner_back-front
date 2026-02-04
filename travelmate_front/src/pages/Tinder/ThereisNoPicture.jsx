//사진이 없으면 보여주는 부분
import React from 'react';
const NoPicture = () => {
    return(
        <div className="flex flex-col items-center justify-center w-[320px] h-[200px] md:w-[520px] md:h-[320px] rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50">
        {/* 이모지 or 아이콘 */}
        <div className="text-5xl mb-4">📭</div>
  
        {/* 안내 문구 */}
        <p className="text-lg font-semibold text-blue-600 mb-1">
          아직 사진이 없어요!
        </p>
        <p className="text-sm text-gray-500 text-center">
          URLCatcher에서 URL을 담아와 주세요 💙
        </p>
      </div>
    );
};

export default NoPicture

  