//사진 추가될 때 보여지는 바(공간)
import React from 'react';

const FavoritePictureSlideBar = ({ list, onItemClick, selectedItem }) => {
  const displayList = list || [];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 ml-2 text-gray-800">Favorite</h2>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {displayList.map((item) => {
          // 카드 선택인지 확인
          const isSelected = selectedItem && selectedItem.id === item.id;

          return (
            <div 
              key={item.id} 
              onClick={() => onItemClick(item)} 
              //선택되면 블러 효과
              // `로 조건부 스타일
              className={`flex-none w-60 h-40 rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer group relative 
                ${isSelected 
                  ? 'blur-[2px] opacity-70'
                  : 'hover:shadow-xl' 
                }`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritePictureSlideBar;