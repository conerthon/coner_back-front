//삭제 옵션 팝업창
import React from 'react';

const DeleteOption = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      
      {/* 점선 박스 */}
      <div className="bg-white rounded-[30px] border-2 border-dashed border-gray-400 p-10 w-96 text-center shadow-2xl animate-bounce-small">
        
        <h3 className="text-2xl font-bold text-[#374151] mb-8">
          삭제하시겠습니까?
        </h3>

        <div className="flex flex-col gap-3">
          {/* 예 버튼 */}
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-full bg-[#4B5563] text-white font-bold hover:bg-[#374151] transition shadow-md"
          >
            예
          </button>
          
          {/* 아니요 버튼 */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full border border-[#4B5563] text-[#4B5563] font-bold bg-white hover:bg-gray-50 transition"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOption;